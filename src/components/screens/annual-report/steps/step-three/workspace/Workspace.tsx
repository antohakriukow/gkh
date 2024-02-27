import {
	IDataObject,
	IResultObject,
	IVariation,
	IWorkspace
} from './workspace.interface'
import { useState } from 'react'

import styles from './Workspace.module.scss'

const Workspace = <T extends IDataObject, T1>({
	component: Component,
	data,
	property,
	variations,
	handleSubmit
}: IWorkspace<T, T1>) => {
	const [buffer, setBuffer] = useState<string[]>([])

	const onSubmit = (data: string[], newPropertyValue: T1) => {
		handleSubmit(data, newPropertyValue)
		setBuffer([])
	}

	const filterDataByVariation = (
		data: T[],
		property: keyof T,
		variations: IVariation<T1>[]
	): IResultObject<T, T1>[] => {
		const result: IResultObject<T, T1>[] = []

		variations
			.sort((a, b) => a.title.localeCompare(b.title))
			.forEach(variation => {
				const filteredData = data.filter(
					item => item[property] === variation.value
				)
				result.push({
					title: variation.title,
					value: variation.value,
					data: filteredData,
					buffer,
					setBuffer,
					handleSubmit: onSubmit
				})
			})

		return result
	}

	const dataWithUndefinedProperty: IResultObject<T, T1> = {
		title: '',
		value: '' as T1,
		data:
			(data.filter(
				object => object[property] === '' || object[property] === undefined
			) as T[]) ?? [],
		buffer,
		setBuffer,
		handleSubmit: onSubmit
	}

	const sortedData = filterDataByVariation(data, property, variations)

	return (
		<div className={styles.container}>
			<div>
				<Component componentData={dataWithUndefinedProperty} />
			</div>
			<div>
				{sortedData.map((dataSet, index) => (
					<Component
						key={index}
						componentData={dataSet as IResultObject<T, T1>}
					/>
				))}
			</div>
		</div>
	)
}

export default Workspace
