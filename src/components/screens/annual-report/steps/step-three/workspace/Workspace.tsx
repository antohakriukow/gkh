import {
	IDataObject,
	IResultObject,
	IVariation,
	IWorkspace
} from './workspace.interface'
import { useState } from 'react'

import { TypeAnnualOperationTag } from '~/shared/types/annual.interface'

import { useStepThree } from '../useStepThree'

import styles from './Workspace.module.scss'

const Workspace = <T extends IDataObject, T1 extends TypeAnnualOperationTag>({
	component: Component,
	data,
	property,
	variations
}: IWorkspace<T, T1>) => {
	const [buffer, setBuffer] = useState<string[]>([])
	const { setBankOperationsTag } = useStepThree()

	const handleSubmit = (data: string[], tag: TypeAnnualOperationTag) => {
		setBankOperationsTag(data, tag)
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
					handleSubmit
				})
			})

		return result
	}

	const dataWithUndefinedProperty: IResultObject<T, T1> = {
		title: 'Поступления от собственников',
		value: undefined as T1,
		data: data.filter(object => object[property] === undefined) as T[],
		buffer,
		setBuffer,
		handleSubmit
	}

	const sortedData = filterDataByVariation(data, property, variations)

	return (
		<div className={styles.container}>
			<div>
				<Component componentData={dataWithUndefinedProperty} />
			</div>
			<div>
				{sortedData.map(dataSet => (
					<Component
						key={dataSet.value}
						componentData={dataSet as IResultObject<T, T1>}
					/>
				))}
			</div>
		</div>
	)
}

export default Workspace
