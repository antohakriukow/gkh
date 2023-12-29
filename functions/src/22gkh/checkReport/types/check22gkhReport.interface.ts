export type TypeCheckResult = 'error' | 'warning'
export type CheckExpression = () => boolean

export interface ICheckListItem {
	condition: () => boolean
	type: TypeCheckResult
	message: string
}

export interface ICheckResult extends Omit<ICheckListItem, 'condition'> {}
