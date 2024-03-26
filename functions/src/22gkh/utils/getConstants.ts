import { getReportData } from './getReport'
import {
	TypeServiceKey,
	distributePayments,
	getCommon,
	getCommunal,
	getCurrentYearPayments,
	getDebts,
	getPreviousPeriodDebts,
	getPreviousPeriodPayments,
	getServiceKeys,
	removeNonResidentialShare,
	sumValues
} from './helpers'

import {
	IAccruals,
	IBudgetFinancing,
	IIncome,
	IOrganizationDebts,
	IRenovationCosts,
	IResidentsDebts
} from '../../types/report22gkh.interface'
import {
	calculatePreviousPayments,
	distributeValues,
	divideAndRoundNumbers,
	generateServicesArea
} from '../../utils/report.utils'

export const getConstants = async (userId: string, reportId: string) => {
	const report = await getReportData(userId, reportId)
	if (!report?.data) {
		throw new Error('Отсутствуют данные отчета')
	}

	const {
		area,
		elevator,
		stove,
		renovation,
		settings,
		natural,
		waterHeating,
		gasBoiler
	} = report?.data
	const accrualsInitial = divideAndRoundNumbers(
		report.data.accruals
	) as IAccruals
	const vatInitial = divideAndRoundNumbers(report.data.vat.values) as IAccruals
	const income = divideAndRoundNumbers(report.data.income) as IIncome
	const residentsDebts = divideAndRoundNumbers(
		report.data.residentsDebts
	) as IResidentsDebts
	const organizationDebts = divideAndRoundNumbers(
		report.data.organizationDebts
	) as IOrganizationDebts
	const budgetFinancing = divideAndRoundNumbers(
		report.data.budgetFinancing
	) as IBudgetFinancing
	const renovationCosts = divideAndRoundNumbers(
		report.data.renovationCosts
	) as IRenovationCosts
	const { period } = report

	// Расчет доли начислений нежилым помещениям и перераспределение этой суммы на прочие услуги. Значение начисленных взносов на капремонт не меняется.
	let calculatedAccruals: Record<TypeServiceKey, number> = {} as Record<
		TypeServiceKey,
		number
	>

	getServiceKeys(['other']).forEach(key => {
		calculatedAccruals[key] = removeNonResidentialShare(
			accrualsInitial[key],
			area.residentialArea,
			area.nonResidentialArea
		)
	})

	const nonResidentialAccrualsShare =
		Object.values(accrualsInitial).reduce((sum, value) => sum + value, 0) -
		accrualsInitial.other -
		accrualsInitial.renovation -
		sumValues(calculatedAccruals)

	const accruals = {
		...calculatedAccruals,
		renovation: accrualsInitial.renovation,
		other: accrualsInitial.other + nonResidentialAccrualsShare
	}

	// Расчет доли НДС в начислениям нежилым помещениям и перераспределение этой суммы на НДС в прочих услугах.
	let calculatedVat: Record<TypeServiceKey, number> = {} as Record<
		TypeServiceKey,
		number
	>

	getServiceKeys(['other']).forEach(key => {
		calculatedVat[key] = removeNonResidentialShare(
			vatInitial[key],
			area.residentialArea,
			area.nonResidentialArea
		)
	})

	const nonResidentialVatShare =
		Object.values(vatInitial).reduce((sum, value) => sum + value, 0) -
		vatInitial.other -
		sumValues(calculatedVat)

	const vat = {
		...calculatedVat,
		other: vatInitial.other + nonResidentialVatShare
	}

	// Монетизируемая площадь
	const monetizedArea = area.residentialArea + area.nonResidentialArea
	const totalArea =
		area.residentialArea + area.nonResidentialArea + area.commonArea

	// Площади
	const calculatedAreas = generateServicesArea(settings, area.residentialArea)

	//Площадь, на которую начисляется капремонт
	const renovationArea =
		renovation.status === 'yes'
			? calculatedAreas.renovation
			: renovation.status === 'both'
			? renovation.areaWith
			: 0

	const accrualsCommonArea = Math.max(
		+calculatedAreas.coldWaterCommon,
		+calculatedAreas.coldToHotWaterCommon,
		+calculatedAreas.heatToHotWaterCommon,
		+calculatedAreas.hotWaterCommon,
		+calculatedAreas.waterDisposalCommon,
		+calculatedAreas.electricityCommon
	)

	// Общая сумма начислений КУ
	const accrualsCommunal = getCommunal(accruals)

	// Общая сумма НДС в КУ
	const vatCommunal = getCommunal(vat)

	// Общая сумма начислений коммунальных ресурсов (КР) на СОИ
	const accrualsCommon = getCommon(accruals)

	// Общая сумма НДС в КР на СОИ
	const vatCommon = getCommon(vat)

	// Общая сумма начислений за ЖУ (Управление МКД, Содержание и текущий ремонт, КР на СОИ)
	const accrualsMaintenance =
		accruals.management + accruals.maintenance + accrualsCommon

	// Общая сумма НДС в начислениях за ЖУ (Управление МКД, Содержание и текущий ремонт, КР на СОИ)
	const vatMaintenance = vat.management + vat.maintenance + vatCommon

	// Сумма начислений за коммунальные услуги и жилищные услуги
	const totalAccruals = accrualsCommunal + accrualsMaintenance + accruals.other

	// Сумма НДС в начислениях за коммунальные услуги и жилищные услуги
	const totalVat = vatCommunal + vatMaintenance + vat.other

	const totalOrganizationDebts = Object.values(organizationDebts).reduce(
		(sum, value) => sum + value,
		0
	)

	// Распределяем платежи за ЖКУ по услугам пропорционально суммам начисления
	let payments: Record<TypeServiceKey, number> = {} as Record<
		TypeServiceKey,
		number
	>

	getServiceKeys(['maintenance']).forEach(key => {
		payments[key] = distributePayments(
			income.housing,
			totalAccruals,
			accruals[key]
		)
	})

	// Вычисляем сумму всех платежей, кроме maintenance
	const totalPaymentsWithoutMaintenance = sumValues(payments)

	// Перезаписываем maintenance
	payments.maintenance = income.housing - totalPaymentsWithoutMaintenance

	// Общая сумма оплат за КУ
	const communalPayments = getCommunal(payments)

	// Общая сумма оплат за КР на СОИ
	const commonPayments = getCommon(payments)

	// Общая сумма оплат за ЖУ ("Управление МКД", "Содержание и текущий ремонт", КР на СОИ)
	const commonAndMaintenancePayments =
		+payments.maintenance + payments.management + commonPayments

	// Устанавливаем размер оплат за текущий период в размере суммы начисления, если оплачено больше чем начислено. Если оплата меньше начисления, то в размере суммы оплаты.
	//prettier-ignore
	const currentYearPayments: Record<TypeServiceKey, number> = {} as Record<TypeServiceKey, number>;

	Object.keys(payments).forEach(key => {
		const serviceKey = key as TypeServiceKey
		currentYearPayments[serviceKey] = getCurrentYearPayments(
			payments[serviceKey],
			accruals[serviceKey]
		)
	})

	// Устанавливаем размер оплат в счет предыдущих периодов как разницу между оплатами и начислениями по каждой услуге. Если оплачено меньше, то возвращаем ноль
	//prettier-ignore
	const previousPeriodPayments: Record<TypeServiceKey, number> = {} as Record<TypeServiceKey, number>;

	Object.keys(payments).forEach(key => {
		const serviceKey = key as TypeServiceKey
		previousPeriodPayments[serviceKey] = getPreviousPeriodPayments(
			payments[serviceKey],
			accruals[serviceKey]
		)
	})

	// Распределение долгов прошлых периодов пропорционально начислениям
	//prettier-ignore

	let previousPeriodDebts: Record<TypeServiceKey, number> = {} as Record<
		TypeServiceKey,
		number
	>

	getServiceKeys(['maintenance']).forEach(key => {
		previousPeriodDebts[key] = getPreviousPeriodDebts(
			residentsDebts.housing,
			totalAccruals,
			accruals[key]
		)
	})

	// Вычисляем сумму всех долгов за прошлые периоды, кроме maintenance
	const totalPreviousPeriodDebtsWithoutMaintenance =
		sumValues(previousPeriodDebts)

	// Перезаписываем maintenance
	previousPeriodDebts.maintenance =
		+residentsDebts.housing - totalPreviousPeriodDebtsWithoutMaintenance

	// Расчет долгов. По каждой услуге: Начислено - оплачено за текущий период + долг за прошлый период - оплачен за прошлый период
	//prettier-ignore
	const debts: Record<TypeServiceKey, number> = {} as Record<TypeServiceKey, number>;

	Object.keys(accruals).forEach(key => {
		const serviceKey = key as TypeServiceKey
		debts[serviceKey] = getDebts(
			accruals[serviceKey],
			currentYearPayments[serviceKey],
			previousPeriodDebts[serviceKey],
			previousPeriodPayments[serviceKey]
		)
	})

	// Общий долг за КУ
	const communalDebts = getCommunal(debts)

	// Общий долг за КР на СОИ
	const commonDebts = getCommon(debts)

	// Общий долг за ЖУ
	const maintenanceDebts = +debts.maintenance + debts.management + commonDebts

	/**
	 * Создает типичную строку данных с учетом начислений и платежей.
	 * @param accruals - Начисления за услугу.
	 * @param payments - Платежи за услугу.
	 * @param area - Площадь, к которой применяются начисления и платежи.
	 * @returns Объект со значениями для строки отчета.
	 */
	const typicalRow = (accruals: number, payments: number, area?: number) => ({
		3: accruals,
		4: payments,
		5: calculatePreviousPayments(payments, accruals),
		6: accruals,
		7: accruals,
		8: !!accruals && !!area ? area : 0
	})

	//Строка отчета №66. Вынесена в константу, так как используется в коде несколько раз
	const totalMaintenanceRow = typicalRow(
		accrualsMaintenance,
		commonAndMaintenancePayments,
		area.residentialArea
	)

	//Строка отчета №76. Вынесена в константу, так как используется в коде несколько раз
	const totalElectricityRow = typicalRow(
		accruals.electricity,
		payments.electricity,
		calculatedAreas.electricity
	)

	const naturalElectricityRow = {
		4: !!natural?.electricityCommon ? natural?.electricityCommon : 0,
		6: area.commonArea ? area.commonArea : 0,
		7:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.electricity
				? calculatedAreas.electricity + area.commonArea
				: totalArea
	}

	const naturalHeatRow = {
		3: natural?.heat,
		5:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.heat
				? calculatedAreas.heat
				: area.residentialArea,
		7:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.heat
				? calculatedAreas.heat + area.commonArea
				: gasBoiler.status === 'yes' || gasBoiler.status === 'both'
				? totalArea - calculatedAreas.gasNetwork - calculatedAreas.gasLiquid
				: totalArea
	}

	/**
	 * Распределяет значения по услугам на основе заданных площадей.
	 * @param row - Строка данных для распределения.
	 * @param areaWith - Площадь с услугой.
	 * @param areaWithout - Площадь без услуги.
	 * @returns Объект с распределенными значениями.
	 */
	const distributeMaintenance = (row: 67 | 68) => {
		const elevatorCopy = { ...elevator }
		if (
			(row === 67 && elevator.status === 'yes') ||
			(row === 68 && elevator.status === 'no')
		) {
			return totalMaintenanceRow
		}

		if (!elevatorCopy.areaWith) elevatorCopy.areaWith = 0
		if (!elevatorCopy.areaWithout) elevatorCopy.areaWithout = 0

		const results = distributeValues(
			totalMaintenanceRow,
			elevatorCopy.areaWith,
			elevatorCopy.areaWithout
		)
		return row === 67 ? results[0] : results[1]
	}

	/**
	 * Распределяет электричество в зависимости от типа плиты.
	 * @param row - Строка данных для распределения.
	 * @returns Объект с распределенными значениями.
	 */
	const distributeElectricity = (row: 77 | 78) => {
		const stoveCopy = { ...stove }
		if (
			(row === 77 && stove.status === 'gas') ||
			(row === 78 && stove.status === 'electro')
		)
			return totalElectricityRow

		if (!stoveCopy.areaGas) stoveCopy.areaGas = 0
		if (!stoveCopy.areaElectro) stoveCopy.areaElectro = 0

		const results = distributeValues(
			totalElectricityRow,
			stoveCopy.areaGas,
			stoveCopy.areaElectro
		)

		return row === 77 ? results[0] : results[1]
	}

	return {
		period,

		calculatedAreas,
		area,
		monetizedArea,
		renovationArea,
		accrualsCommonArea,

		accruals,
		accrualsCommunal,
		accrualsCommon,
		accrualsMaintenance,
		totalAccruals,

		vat,
		vatCommunal,
		vatCommon,
		vatMaintenance,
		totalVat,

		payments,
		communalPayments,
		commonPayments,
		commonAndMaintenancePayments,

		debts,
		maintenanceDebts,
		communalDebts,
		commonDebts,
		organizationDebts,
		totalOrganizationDebts,

		income,
		budgetFinancing,
		renovationCosts,
		natural,

		typicalRow,
		totalMaintenanceRow,
		totalElectricityRow,
		distributeMaintenance,
		distributeElectricity,

		naturalElectricityRow,
		naturalHeatRow,

		renovation,
		stove,
		waterHeating,
		gasBoiler,
		elevator
	}
}
