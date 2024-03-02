import {
	IDataObject,
	IResultObject,
	IVariation,
	IWorkspace
} from './workspace.interface'
import { Fragment, useCallback, useState } from 'react'

import { IAnnualCategory } from '~/shared/types/annual.interface'

import styles from './Workspace.module.scss'

const Workspace = <T extends IDataObject, T1>({
	component: Component,
	data,
	property,
	variations,
	handleSubmit,
	categories
}: IWorkspace<T, T1>) => {
	const [buffer, setBuffer] = useState<string[]>([])

	// console.log('categories: ', categories)
	// console.log('variations: ', variations)

	function findParents(
		value: T1,
		categories: IAnnualCategory[],
		path: string[] = []
	): string[][] {
		let paths: string[][] = []

		for (const category of categories) {
			const newPath = [...path, category.value] // Создаем новый путь, добавляя текущую категорию

			if (category.children?.some(child => `${child.id}` === `${value}`)) {
				// Если нашли совпадение, добавляем текущий путь в результаты
				paths.push(newPath)
			} else if (category.children) {
				// Если совпадений нет, но есть дети, продолжаем поиск рекурсивно
				const childPaths = findParents(value, category.children, newPath)
				paths = paths.concat(childPaths) // Добавляем найденные пути
			}
		}

		return paths
	}

	const dataSetWithUndefinedProperty = data.filter(
		dataItem =>
			!(variations as IVariation<typeof property>[])
				.map(variation => variation.value)
				.includes(dataItem[property]) ||
			dataItem[property] === '' ||
			dataItem[property] === undefined
	)

	const onSubmit = useCallback(
		(data: string[], newPropertyValue: T1) => {
			handleSubmit(data, newPropertyValue)
			setBuffer([])
		},
		[handleSubmit]
	)

	const filterDataByVariation = (
		data: T[],
		property: keyof T,
		variations: IVariation<T1>[]
	): IResultObject<T, T1>[] => {
		const result: IResultObject<T, T1>[] = []
		let previousParents: string[] = [] // Используется для отслеживания всех родителей

		variations.forEach(variation => {
			const filteredData = data.filter(
				item => item[property] === variation.value
			)
			const paths = findParents(variation.value, categories ?? [])

			// Преобразование множественных путей в один массив уникальных родителей
			const currentParents = paths.flat() // Преобразуем массив массивов в один массив
			const uniqueParents = Array.from(new Set(currentParents)) // Убираем дубликаты
			const newParents = uniqueParents.filter(
				parent => !previousParents.includes(parent)
			)

			// Обновляем список уже учтенных родителей
			previousParents = [...previousParents, ...newParents]

			result.push({
				title: variation.title,
				value: variation.value,
				data: filteredData,
				buffer,
				setBuffer,
				handleSubmit: onSubmit,
				parents: newParents // Теперь это просто массив уникальных новых родителей
			})
		})

		return result
	}

	const sortedData = filterDataByVariation(data, property, variations)

	const dataWithUndefinedProperty: IResultObject<T, T1> = {
		title: '',
		value: '' as T1,
		data: dataSetWithUndefinedProperty as T[],
		buffer,
		setBuffer,
		handleSubmit: onSubmit,
		parents: []
	}

	return (
		<div className={styles.container}>
			<div>
				<Component componentData={dataWithUndefinedProperty} />
			</div>
			<div>
				{sortedData.map((dataSet, index) => (
					<Fragment>
						{dataSet.parents &&
							dataSet.parents.map((parent, parentIndex) => {
								return (
									<div
										className={styles.parent}
										key={parent}
										style={{ paddingLeft: `${8 * (parentIndex + 1)}px` }}
									>
										{index > 0 ? `- ${parent}` : parent}
									</div>
								)
							})}
						<Component
							key={index}
							componentData={dataSet as IResultObject<T, T1>}
						/>
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default Workspace
