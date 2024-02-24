import { Dispatch, FC, SetStateAction } from 'react'

import { IAnnualCategory } from '~/shared/types/annual.interface'

export interface IVariation<T1> {
	title: string
	value: T1
}

export interface IDataObject {
	[key: string]: any
}

export type TypeHandleSubmit<T1> = (data: string[], id: T1) => void

export interface IResultObject<T, T1> {
	data: T[]
	title: string
	value: T1
	buffer: string[]
	setBuffer: Dispatch<SetStateAction<string[]>>
	handleSubmit: TypeHandleSubmit<T1>
}

export interface IWorkspace<T, T1> {
	component: FC<{
		componentData: IResultObject<T, T1>
	}>
	data: T[]
	property: keyof T
	variations: IVariation<T1>[]
	handleSubmit: TypeHandleSubmit<T1>
	categories?: IAnnualCategory[]
}

export interface IWorkspaceComponentProps<T, T1> {
	componentData: IResultObject<T, T1>
}
