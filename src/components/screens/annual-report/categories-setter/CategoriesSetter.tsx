import { TreeProvider } from './TreeProvider'
import ItemCreator from './components/ItemCreator'
import Tree from './components/Tree'
import { useCategoriesSetter } from './useCategoriesSetter'
import { FC, useState } from 'react'

import { Loader, SubHeading } from '~/components/ui'

import {
	IAnnualCategoryState,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import Container from '../shared/container/Container'

import styles from './categories-setter.module.scss'

const CategoriesSetter: FC<{}> = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [annualCategories, setAnnualCategories] = useState<
		IAnnualCategoryState[]
	>([])
	const { saveMainCategories, redirectToAccrualsSetter } = useCategoriesSetter()

	const direction = 'main' as TypeAnnualDirection

	const handleSubmit = async () => {
		setIsLoading(true)
		await saveMainCategories(annualCategories)
		setIsLoading(false)
		redirectToAccrualsSetter()
	}

	return (
		<TreeProvider
			direction={direction}
			setAnnualCategories={setAnnualCategories}
		>
			<Container onNext={handleSubmit} hasNoBackButton>
				<div className={styles.container}>
					<SubHeading title='Настройте иерархию услуг:' />

					<Tree />
					<ItemCreator />
				</div>
			</Container>
			{isLoading && <Loader loaderType='fullscreen' />}
		</TreeProvider>
	)
}

export default CategoriesSetter
