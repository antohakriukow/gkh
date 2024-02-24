import { FC, ReactElement } from 'react'

import styles from './CategoryRenderer.module.scss'

interface IAnnualCategory {
	id: number
	value: string
	amount?: number
	children?: IAnnualCategory[]
}

interface CategoryRendererProps {
	categories: IAnnualCategory[]
	RenderComponent: FC<{ category: IAnnualCategory }>
}

const CategoryRenderer: FC<CategoryRendererProps> = ({
	categories,
	RenderComponent
}) => {
	const renderCategory = (
		category: IAnnualCategory,
		level = 0
	): ReactElement => {
		if (category.children && category.children.length > 0) {
			return (
				<div
					key={category.id}
					className={styles.categoryItem}
					style={{ marginLeft: `${level * 16}px` }}
				>
					<div className={styles.categoryContent}>{category.value}</div>
					<div>
						{category.children.map(child => renderCategory(child, level + 1))}
					</div>
				</div>
			)
		} else {
			return (
				<div
					key={category.id}
					className={`${styles.categoryItem} ${styles.renderComponent}`}
					style={{ marginLeft: `${level * 16}px` }}
				>
					<RenderComponent category={category} />
				</div>
			)
		}
	}

	return (
		<div className={styles.container}>
			{categories.map(category => renderCategory(category))}
		</div>
	)
}

export default CategoryRenderer
