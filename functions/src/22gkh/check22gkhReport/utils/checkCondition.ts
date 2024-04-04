import {
	ICheckListItem,
	TypeCheckResult
} from '../../../../../src/shared/types/report.interface'

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
