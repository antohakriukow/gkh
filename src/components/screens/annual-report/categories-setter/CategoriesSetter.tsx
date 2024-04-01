import ItemCreator from './components/ItemCreator'
import Tree from './components/Tree'
import { TreeProvider } from './provider/TreeProvider'
import { useCategoriesSetter } from './useCategoriesSetter'
import { FC, useState } from 'react'
import { useWindowWidth } from '~/hooks'

import { Loader, SubHeading } from '~/components/ui'

import {
	IAnnualCategoryState,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { Container, NarrowAttention } from '../shared'
import { useAnnualReport } from '../useAnnualReport'

import styles from './categories-setter.module.scss'

const CategoriesSetter: FC<{}> = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [annualCategories, setAnnualCategories] = useState<
		IAnnualCategoryState[]
	>([])
	const { saveMainCategories, redirectToAccrualsSetter } = useCategoriesSetter()
	const {
		isDataLoading,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport
	} = useAnnualReport()
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const direction = 'main' as TypeAnnualDirection

	const handleSubmit = async () => {
		setIsLoading(true)
		await saveMainCategories(annualCategories)
		setIsLoading(false)
		redirectToAccrualsSetter()
	}

	if (isNarrow) return <NarrowAttention />

	if (isLoading || isDataLoading) return <Loader loaderType='fullscreen' />

	return (
		<TreeProvider
			direction={direction}
			setAnnualCategories={setAnnualCategories}
		>
			<Container
				onNext={handleSubmit}
				hasNoBackButton
				isReportPayed={isReportPayed}
				handleCloseReport={closeAnnualReport}
				handleDeleteReport={deleteAnnualReport}
			>
				<div className={styles.container}>
					<SubHeading title='Настройте иерархию услуг:' />

					<Tree />
					<ItemCreator />
				</div>
			</Container>
		</TreeProvider>
	)
}

export default CategoriesSetter
