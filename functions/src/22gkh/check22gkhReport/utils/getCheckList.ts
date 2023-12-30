import { checkCondition } from './checkCondition'

import { ICheckListItem } from '../../../types/report.interface'
import { getConstants } from '../../utils/getConstants'

export const getCheckList = async (
	userId: string,
	reportId: string
): Promise<ICheckListItem[]> => {
	const {
		period,
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
		budgetFinancing,
		renovationCosts,
		natural,
		renovation,
		stove,
		waterHeating,
		gasBoiler
	} = await getConstants(userId, reportId)

	return [
		checkCondition(
			stove.status === 'electro' || stove.status === 'both',
			accruals.electricity > 0,
			'warning',
			'В домах с электроплитами должна начисляться плата за электроэнергию при условии отсутствия прямых договоров между РСО и собственниками.'
		),
		checkCondition(
			stove.status === 'electro' || stove.status === 'both',
			accruals.electricityCommon > 0,
			'error',
			'В домах с электроплитами должна начисляться плата за электроэнергию СОИ.'
		),
		checkCondition(
			(waterHeating.status === 'yes' || waterHeating.status === 'both') &&
				gasBoiler.status === 'no',
			accruals.coldToHotWater > 0 && accruals.heatToHotWater > 0,
			'error',
			'УО осуществляет подогрев воды с помощью теплоносителя: должна начисляться плата за ХВС для ГВС и Тепловую энергию для ГВС.'
		),
		checkCondition(
			gasBoiler.status === 'yes' || gasBoiler.status === 'both',
			accruals.gasNetwork > 0 || accruals.gasLiquid > 0,
			'error',
			'В домах с газовой котельной должны быть начисления платы за газ (в квитанции скорее всего отражены как тепловая энергия или отопление).'
		),
		checkCondition(
			gasBoiler.status === 'yes' || gasBoiler.status === 'both',
			accruals.electricityCommon > 0,
			'warning',
			'В домах с газовой котельной должны быть начисления платы за Электроэнергию СОИ (Затраты электроэнергии на работу котельной относятся на статью "Электроэнергия СОИ").'
		),
		checkCondition(
			gasBoiler.status === 'yes' || gasBoiler.status === 'both',
			accruals.coldWaterCommon > 0,
			'warning',
			'В домах с газовой котельной с высокой вероятностью должны быть начисления платы за ХВС для ГВС.'
		),
		checkCondition(
			renovation.status === 'yes' || renovation.status === 'both',
			accruals.renovation > 0,
			'error',
			'Если УО начисляет взносы на капитальный ремонт, то сумма начисления должна быть больше нуля.'
		),
		checkCondition(
			renovationCosts.status === 'yes',
			renovationCosts.totalAmount > 0,
			'error',
			'Если УО проводило капитальный ремонт в отчетном периоде, то сумма затрат на капитальный ремонт должна быть больше нуля.'
		),
		checkCondition(
			budgetFinancing.status === 'yes',
			budgetFinancing.totalAmount > 0,
			'error',
			'Если УО получало бюджетное финансирование в отчетном периоде, то сумма финансирования должна быть больше нуля.'
		),
		checkCondition(
			accruals.coldWater > 0 ||
				accruals.coldToHotWater > 0 ||
				accruals.hotWater > 0,
			accruals.waterDisposal > 0,
			'error',
			'Если начислена плата за ХВС, ГВС или ХВС для ГВС, то должна быть начислена плата за водоотведение.'
		),
		checkCondition(
			accruals.coldWaterCommon > 0 ||
				accruals.coldToHotWaterCommon > 0 ||
				accruals.hotWaterCommon > 0,
			accruals.waterDisposalCommon > 0,
			'error',
			'Если начислена плата за ХВС СОИ, ГВС СОИ или ХВС для ГВС СОИ, то должна быть начислена плата за водоотведение СОИ.'
		),
		checkCondition(
			accruals.coldWater > 0 ||
				accruals.coldToHotWater > 0 ||
				accruals.hotWater > 0,
			accruals.waterDisposal > 0,
			'error',
			'Если начислена плата за ХВС, ГВС или ХВС для ГВС, то должна быть начислена плата за водоотведение.'
		),
		checkCondition(
			period === 4 && accruals.electricityCommon > 0,
			natural.electricityCommon > 0,
			'error',
			'В натуральных показателях за год не отражен суммарный объем приобретенной у РСО электроэнергии на СОИ в кВт/ч.'
		),
		checkCondition(
			period === 4 && accruals.electricityCommon === 0,
			natural.electricityCommon === 0,
			'error',
			'При отсутствии начисления платы за электроэнергию СОИ в натуральных показателях за год объем электроэнергии в кВт/ч должен быть равен нулю.'
		),
		checkCondition(
			period === 4 && accruals.heat > 0,
			natural.heat > 0,
			'error',
			'В натуральных показателях за год не отражен суммарный объем приобретенной у РСО тепловой энергии (только для отопления) в Гкал.'
		),
		checkCondition(
			period === 4 && accruals.heat === 0,
			natural.heat === 0,
			'error',
			'При отсутствии начисления платы за отопление в натуральных показателях за год объем тепловой энергии в Гкал должен быть равен нулю.'
		)
	]
}
