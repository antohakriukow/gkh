import {
	ICheckListItem,
	TypeCheckResult
} from '../types/check22gkhReport.interface'

export const checkCondition = (
	condition: boolean,
	expression: boolean,
	type: TypeCheckResult,
	message: string
): ICheckListItem => {
	return {
		condition: () => (condition ? expression : true),
		type,
		message
	}
}
