import Tag from './components/Tag'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAnnualTagVariationsData } from '~/data/annual-tag-variations'

import { Loader } from '~/components/ui'

import { useAuth } from '~/hooks/useAuth'
import { useModal } from '~/hooks/useModal'

import {
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { areArraysEqualByKey } from '~/utils/array.utils'

import Container from '../shared/container/Container'
import { useAnnualReport } from '../useAnnualReport'

import styles from './credit-sorter.module.scss'

const CreditSorter: FC = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { annualReportInDB } = useAnnualReport()
	const { showModal } = useModal()
	const { user } = useAuth()
	const navigate = useNavigate()

	const redirectToAccrualsSetter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/accruals-setter`)

	const redirectToDebitSorter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/debit-sorter`)

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

	const toggleOperationSelection = useCallback(
		(id: string) => {
			setSelectedOperations(prev =>
				prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
			)
		},
		[setSelectedOperations]
	)

	const handleSubmit = (tag: TypeAnnualOperationTag) => {
		setLocalOperations(
			localOperations.map(operation =>
				selectedOperations.includes(operation._id)
					? { ...operation, tag }
					: operation
			)
		)
		setSelectedOperations([])
	}

	const { operationsWithTag, operationsWithoutTag } = useMemo(() => {
		let operationsWithTag = [] as IExtendedBankOperation[]
		let operationsWithoutTag = [] as IExtendedBankOperation[]

		localOperations
			.filter(operation => operation.amount > 0)
			.forEach(operation => {
				operation.tag === undefined || operation.tag === ''
					? operationsWithoutTag.push(operation)
					: operationsWithTag.push(operation)
			})

		return {
			operationsWithTag,
			operationsWithoutTag
		}
	}, [localOperations])

	const tags = getAnnualTagVariationsData('main')
	const lastBankOperationId = localOperations.length - 1

	const saveBankOperationsToDB = async () => {
		if (!user || !annualReportInDB) return
		const localOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = localOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...localOperations, ...notMainBankOperations]
		if (areArraysEqualByKey(localOperationsInDB, resultArray, '_id', 'tag')) {
			return
		}
		try {
			await AnnualService.updateBankOperations(
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
		redirectToDebitSorter()
	}

	return (
		<Container onNext={onNext} onBack={redirectToAccrualsSetter}>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<Tag
						tag={{ title: 'ЖКУ: Поступления от собственников', value: '' }}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						showModal={showModal}
						lastBankOperationId={lastBankOperationId}
						operations={operationsWithoutTag}
						handleSubmit={handleSubmit}
					/>
				</div>
				<div className={styles.rightSide}>
					{tags.map(tag => (
						<Tag
							key={tag.value}
							tag={tag}
							toggleOperationSelection={toggleOperationSelection}
							selectedOperations={selectedOperations}
							showModal={showModal}
							lastBankOperationId={lastBankOperationId}
							operations={operationsWithTag.filter(op => op.tag === tag.value)}
							handleSubmit={handleSubmit}
						/>
					))}
				</div>
			</div>
			{isLoading && <Loader loaderType='fullscreen' />}
		</Container>
	)
}
export default CreditSorter
