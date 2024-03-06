import Category from './components/Category'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '~/components/ui'

import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import {
	getAllLeafCategoryIds,
	getOperationsByCategory
} from '~/utils/annual.utils'
import { areArraysEqualByKey } from '~/utils/array.utils'

import Container from '../shared/container/Container'
import { useAnnualReport } from '../useAnnualReport'

import styles from './debit-sorter.module.scss'

const DebitSorter: FC = memo(() => {
	const [isLoading, setIsLoading] = useState(true)
	const { annualReportInDB } = useAnnualReport()
	const { showModal } = useModal()
	const { user } = useAuth()
	const navigate = useNavigate()

	const redirectToCreditSorter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/credit-sorter`)

	const redirectToPreview = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/preview`)

	const initialOperations = useMemo(
		() =>
			annualReportInDB?.data.bankOperations?.filter(
				operation => operation.direction === 'main'
			) ?? [],
		[annualReportInDB?.data.bankOperations]
	)

	const [localOperations, setLocalOperations] =
		useState<IExtendedBankOperation[]>(initialOperations)

	useEffect(() => {
		if (localOperations.length === 0 && !!annualReportInDB?.data.bankOperations)
			setLocalOperations(
				annualReportInDB?.data.bankOperations?.filter(
					operation => operation.direction === 'main'
				)
			)
	}, [
		localOperations,
		setLocalOperations,
		annualReportInDB?.data.bankOperations
	])

	const [selectedOperations, setSelectedOperations] = useState<string[]>([])

	const lastBankOperationId = localOperations.length - 1

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setSelectedOperations(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setSelectedOperations]
	)

	const handleSubmit = (categoryId: string) => {
		setLocalOperations(
			localOperations.map(operation =>
				selectedOperations.includes(operation._id)
					? { ...operation, categoryId: categoryId }
					: operation
			)
		)

		setSelectedOperations([])
	}

	const categoriesWithoutChildrenIds = useMemo(() => {
		const mainCategories = annualReportInDB?.data.categories?.main ?? []
		return getAllLeafCategoryIds(mainCategories)
	}, [annualReportInDB?.data.categories])

	const { sortedOperations, unsortedOperations } = useMemo(() => {
		let sortedOps = [] as IExtendedBankOperation[]
		let unsortedOps = [] as IExtendedBankOperation[]

		localOperations
			.filter(operation => operation.amount < 0)
			.forEach(operation => {
				!categoriesWithoutChildrenIds.includes(operation.categoryId) ||
				operation.categoryId === '' ||
				operation.categoryId === undefined
					? unsortedOps.push(operation)
					: sortedOps.push(operation)
			})

		return {
			sortedOperations: sortedOps,
			unsortedOperations: unsortedOps
		}
	}, [localOperations, categoriesWithoutChildrenIds])

	const mockUnsortedCategory = {
		value: 'ЖКУ: Прочие списания',
		id: ''
	}

	const saveBankOperationsToDB = () => {
		if (!user || !annualReportInDB) return
		const bankOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = bankOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...localOperations, ...notMainBankOperations]
		if (
			areArraysEqualByKey(bankOperationsInDB, resultArray, '_id', 'categoryId')
		) {
			return
		}

		try {
			AnnualService.updateBankOperations(
				user.uid,
				annualReportInDB._id.toString(),
				resultArray
			)
		} catch (error) {
			console.log('ERROR: ', error)
		}
	}

	const onNext = async () => {
		await setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 1500))
		await saveBankOperationsToDB()
		await setIsLoading(false)
		redirectToPreview()
	}

	if (isLoading || !annualReportInDB)
		return (
			<Container>
				<Loader loaderType='fullscreen' />
			</Container>
		)

	return (
		<Container onNext={onNext} onBack={redirectToCreditSorter}>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<Category
						category={mockUnsortedCategory}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						showModal={showModal}
						lastBankOperationId={lastBankOperationId}
						operations={unsortedOperations}
						handleSubmit={handleSubmit}
					/>
				</div>
				<div className={styles.rightSide}>
					{annualReportInDB?.data?.categories?.main?.map(category => (
						<Category
							key={category.id}
							category={category}
							operations={getOperationsByCategory(sortedOperations, category)}
							toggleOperationSelection={toggleOperationSelection}
							selectedOperations={selectedOperations}
							showModal={showModal}
							lastBankOperationId={lastBankOperationId}
							handleSubmit={handleSubmit}
						/>
					))}
				</div>
			</div>
		</Container>
	)
})
export default DebitSorter
