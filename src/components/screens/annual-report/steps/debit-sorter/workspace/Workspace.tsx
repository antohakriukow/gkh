import { IDataObject, IResultObject, IWorkspace } from './workspace.interface'
import { useCallback, useState } from 'react'

import CategoryRenderer from '../../shared/category-render/CategoryRenderer'

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

	const onSubmit = useCallback(
		(data: string[], newPropertyValue: T1) => {
			handleSubmit(data, newPropertyValue)
			setBuffer([])
		},
		[handleSubmit]
	)

	const dataWithUndefinedProperty: IResultObject<T, T1> = {
		title: '',
		value: '' as T1,
		data: data.filter(
			object => object[property] === '' || object[property] === undefined
		) as T[],
		buffer,
		setBuffer,
		handleSubmit: onSubmit
	}

	return (
		<div className={styles.container}>
			<div>
				<Component componentData={dataWithUndefinedProperty} />
			</div>
			<div>
				{categories && (
					<CategoryRenderer
						categories={categories}
						RenderComponent={({ category }) => (
							<Component
								componentData={{
									title: category.value,
									value: category.id.toString() as T1,
									data: data.filter(
										item => item[property] === category.id.toString()
									),
									buffer,
									setBuffer,
									handleSubmit: onSubmit
								}}
							/>
						)}
					/>
				)}
			</div>
		</div>
	)
}

export default Workspace
