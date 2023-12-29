import { ICheckListItem } from './types/check22gkhReport.interface'
import { checkCondition } from './utils/checkCondition'

import { getConstants } from '../utils/getConstants'

export const getCheckList = async (
	userId: string,
	reportId: string
): Promise<ICheckListItem[]> => {
	const {
		// calculatedAreas,
		// area,
		// monetizedArea,
		// renovationArea,

		accruals,
		// accrualsCommunal,
		// accrualsCommon,
		// accrualsMaintenance,
		// totalAccruals,

		// payments,
		// communalPayments,
		// commonPayments,
		// commonAndMaintenancePayments,

		// debts,
		// maintenanceDebts,
		// communalDebts,
		// commonDebts,
		// organizationDebts,
		// totalOrganizationDebts,

		// income,
		// budgetFinancing,
		// renovationCosts,
		// natural,
		stove,
		waterHeating,
		gasBoiler
	} = await getConstants(userId, reportId)

	return [
		checkCondition(
			stove.status === 'electro' || stove.status === 'both',
			accruals.electricity > 0,
			'warning',
			'В доме с электроплитами должна начисляться плата за электроэнергию при условии отсутствия прямых договоров между РСО и собственниками '
		),
		checkCondition(
			stove.status === 'electro' || stove.status === 'both',
			accruals.electricityCommon > 0,
			'error',
			'В доме с электроплитами должна начисляться плата за электроэнергию СОИ'
		),
		checkCondition(
			(waterHeating.status === 'yes' || waterHeating.status === 'both') &&
				gasBoiler.status === 'no',
			accruals.coldToHotWater > 0 && accruals.heatToHotWater > 0,
			'error',
			'УО осуществляет подогрев воды с помощью теплоносителя: должна начисляться плата за ХВС на ГВС и Тепловую энергию на ГВС'
		)
	]
}
