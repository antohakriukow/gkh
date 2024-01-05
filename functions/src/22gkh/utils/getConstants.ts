import { getReportData } from './getReport'

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
		gasBoiler,
		vat
	} = report?.data
	const accruals = divideAndRoundNumbers(report.data.accruals) as IAccruals
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

	// Монетизируемая площадь
	const monetizedArea = area.residentialArea + area.nonResidentialArea
	const totalArea =
		area.residentialArea + area.nonResidentialArea + area.commonArea

	/**
	 * Генерирует объект с площадями услуг, основываясь на настройках и заданной общей площади.
	 *
	 * Эта функция принимает объект настроек и общую монетизированную площадь, затем генерирует
	 * и возвращает объект, в котором каждому ключу услуги соответствует её площадь. Если для услуги
	 * указана конкретная площадь в настройках, используется она; в противном случае используется
	 * общая монетизированная площадь.
	 *
	 * @param settings - Объект настроек, содержащий информацию о площадях различных услуг.
	 * @param monetizedArea - Общая монетизированная площадь, используемая по умолчанию.
	 * @returns Объект, где ключи - это услуги, а значения - соответствующие площади.
	 */
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
	const accrualsCommunal =
		+accruals.coldWater +
		accruals.coldToHotWater +
		accruals.hotWater +
		accruals.waterDisposal +
		accruals.heat +
		accruals.heatToHotWater +
		accruals.electricity +
		accruals.gasNetwork +
		accruals.gasLiquid +
		accruals.solidWasteRemoval

	// Общая сумма НДС в КУ
	const vatCommunal =
		+vat.values.coldWater +
		vat.values.coldToHotWater +
		vat.values.hotWater +
		vat.values.waterDisposal +
		vat.values.heat +
		vat.values.heatToHotWater +
		vat.values.electricity +
		vat.values.gasNetwork +
		vat.values.gasLiquid +
		vat.values.solidWasteRemoval

	// Общая сумма начислений коммунальных ресурсов (КР) на СОИ
	const accrualsCommon =
		+accruals.coldWaterCommon +
		accruals.coldToHotWaterCommon +
		accruals.heatToHotWaterCommon +
		accruals.hotWaterCommon +
		accruals.waterDisposalCommon +
		accruals.electricityCommon

	// Общая сумма НДС в КР на СОИ
	const vatCommon =
		+vat.values.coldWaterCommon +
		vat.values.coldToHotWaterCommon +
		vat.values.heatToHotWaterCommon +
		vat.values.hotWaterCommon +
		vat.values.waterDisposalCommon +
		vat.values.electricityCommon

	// Общая сумма начислений за ЖУ (Управление МКД, Содержание и текущий ремонт, КР на СОИ)
	const accrualsMaintenance =
		accruals.management + accruals.maintenance + accrualsCommon

	// Общая сумма НДС в начислениях за ЖУ (Управление МКД, Содержание и текущий ремонт, КР на СОИ)
	const vatMaintenance =
		vat.values.management + vat.values.maintenance + vatCommon

	// Сумма начислений за коммунальные услуги и жилищные услуги
	const totalAccruals = accrualsCommunal + accrualsMaintenance

	// Сумма НДС в начислениях за коммунальные услуги и жилищные услуги
	const totalVat = vatCommunal + vatMaintenance

	const totalOrganizationDebts = Object.values(organizationDebts).reduce(
		(sum, value) => sum + value,
		0
	)

	// Распределяем платежи за ЖКУ по услугам пропорционально суммам начисления
	//prettier-ignore
	let payments = {
    coldWater: Math.round((income.housing / totalAccruals) * accruals.coldWater) || 0,
    coldToHotWater: Math.round((income.housing / totalAccruals) * accruals.coldToHotWater) || 0,
    hotWater: Math.round((income.housing / totalAccruals) * accruals.hotWater) || 0,
    waterDisposal: Math.round((income.housing / totalAccruals) * accruals.waterDisposal) || 0,
    heat: Math.round((income.housing / totalAccruals) * accruals.heat) || 0,
    heatToHotWater: Math.round((income.housing / totalAccruals) * accruals.heatToHotWater) || 0,
    electricity: Math.round((income.housing / totalAccruals) * accruals.electricity) || 0,
    gasNetwork: Math.round((income.housing / totalAccruals) * accruals.gasNetwork) || 0,
    gasLiquid: Math.round((income.housing / totalAccruals) * accruals.gasLiquid) || 0,
    solidWasteRemoval: Math.round((income.housing / totalAccruals) * accruals.solidWasteRemoval) || 0,
    coldWaterCommon: Math.round((income.housing / totalAccruals) * accruals.coldWaterCommon) || 0,
    coldToHotWaterCommon: Math.round((income.housing / totalAccruals) * accruals.coldToHotWaterCommon) || 0,
    heatToHotWaterCommon: Math.round((income.housing / totalAccruals) * accruals.heatToHotWaterCommon) || 0,
    hotWaterCommon: Math.round((income.housing / totalAccruals) * accruals.hotWaterCommon) || 0,
    waterDisposalCommon: Math.round((income.housing / totalAccruals) * accruals.waterDisposalCommon) || 0,
    electricityCommon: Math.round((income.housing / totalAccruals) * accruals.electricityCommon) || 0,
    management: Math.round((income.housing / totalAccruals) * accruals.management) || 0,
    maintenance:0
};

	// Вычисляем сумму всех платежей, кроме maintenance
	const totalPaymentsWithoutMaintenance = Object.values(payments).reduce(
		(sum, value) => sum + value,
		0
	)

	// Перезаписываем maintenance
	payments.maintenance = income.housing - totalPaymentsWithoutMaintenance

	// Общая сумма оплат за КУ
	const communalPayments =
		+payments.coldWater +
		payments.coldToHotWater +
		payments.hotWater +
		payments.waterDisposal +
		payments.heat +
		payments.heatToHotWater +
		payments.electricity +
		payments.gasNetwork +
		payments.gasLiquid +
		payments.solidWasteRemoval

	// Общая сумма оплат за КР на СОИ
	const commonPayments =
		+payments.coldWaterCommon +
		payments.coldToHotWaterCommon +
		payments.heatToHotWaterCommon +
		payments.hotWaterCommon +
		payments.waterDisposalCommon +
		payments.electricityCommon

	// Общая сумма оплат за ЖУ ("Управление МКД", "Содержание и текущий ремонт", КР на СОИ)
	const commonAndMaintenancePayments =
		+payments.maintenance + payments.management + commonPayments

	// Устанавливаем размер оплат за текущий период в размере суммы начисления, если оплачено больше чем начислено. Если оплата меньше начисления, то в размере суммы оплаты.
	//prettier-ignore
	const currentYearPayments = {
		coldWater: payments.coldWater >= accruals.coldWater ? accruals.coldWater : payments.coldWater,
		coldToHotWater: payments.coldToHotWater >= accruals.coldToHotWater ? accruals.coldToHotWater : payments.coldToHotWater,
		hotWater: payments.hotWater >= accruals.hotWater ? accruals.hotWater : payments.hotWater,
		waterDisposal: payments.waterDisposal >= accruals.waterDisposal ? accruals.waterDisposal : payments.waterDisposal,
		heat: payments.heat >= accruals.heat ? accruals.heat : payments.heat,
		heatToHotWater: payments.heatToHotWater >= accruals.heatToHotWater ? accruals.heatToHotWater : payments.heatToHotWater,
		electricity: payments.electricity >= accruals.electricity ? accruals.electricity : payments.electricity,
		gasNetwork: payments.gasNetwork >= accruals.gasNetwork ? accruals.gasNetwork : payments.gasNetwork,
		gasLiquid: payments.gasLiquid >= accruals.gasLiquid ? accruals.gasLiquid : payments.gasLiquid,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? accruals.solidWasteRemoval : payments.solidWasteRemoval,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? accruals.coldWaterCommon : payments.coldWaterCommon,
		coldToHotWaterCommon: payments.coldToHotWaterCommon >= accruals.coldToHotWaterCommon ? accruals.coldToHotWaterCommon : payments.coldToHotWaterCommon,
		heatToHotWaterCommon: payments.heatToHotWaterCommon >= accruals.heatToHotWaterCommon ? accruals.heatToHotWaterCommon : payments.heatToHotWaterCommon,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? accruals.hotWaterCommon : payments.hotWaterCommon,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? accruals.waterDisposalCommon : payments.waterDisposalCommon,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? accruals.electricityCommon : payments.electricityCommon,
		management: payments.management >= accruals.management ? accruals.management : payments.management,
		maintenance: payments.maintenance >= accruals.maintenance ? accruals.maintenance : payments.maintenance
	}

	// Устанавливаем размер оплат в счет предыдущих периодов как разницу между оплатами и начислениями по каждой услуге. Если оплачено меньше, то возвращаем ноль
	//prettier-ignore
	const previousPeriodPayments = {
		coldWater: payments.coldWater >= accruals.coldWater ? +payments.coldWater - accruals.coldWater : 0,
		coldToHotWater: payments.coldToHotWater >= accruals.coldToHotWater ? +payments.coldToHotWater - accruals.coldToHotWater : 0,
		hotWater: payments.hotWater >= accruals.hotWater ? +payments.hotWater - accruals.hotWater : 0,
		waterDisposal: payments.waterDisposal >= accruals.waterDisposal ? +payments.waterDisposal - accruals.waterDisposal : 0,
		heat: payments.heat >= accruals.heat ? +payments.heat - accruals.heat : 0,
		heatToHotWater: payments.heatToHotWater >= accruals.heatToHotWater ? +payments.heatToHotWater - accruals.heatToHotWater : 0,
		electricity: payments.electricity >= accruals.electricity ? +payments.electricity - accruals.electricity : 0,
		gasNetwork: payments.gasNetwork >= accruals.gasNetwork ? +payments.gasNetwork - accruals.gasNetwork : 0,
		gasLiquid: payments.gasLiquid >= accruals.gasLiquid ? +payments.gasLiquid - accruals.gasLiquid : 0,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? +payments.solidWasteRemoval - accruals.solidWasteRemoval : 0,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? +payments.coldWaterCommon - accruals.coldWaterCommon : 0,
		coldToHotWaterCommon: payments.coldToHotWaterCommon >= accruals.coldToHotWaterCommon ? +payments.coldToHotWaterCommon - accruals.coldToHotWaterCommon : 0,
		heatToHotWaterCommon: payments.heatToHotWaterCommon >= accruals.heatToHotWaterCommon ? +payments.heatToHotWaterCommon - accruals.heatToHotWaterCommon : 0,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? +payments.hotWaterCommon - accruals.hotWaterCommon : 0,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? +payments.waterDisposalCommon - accruals.waterDisposalCommon : 0,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? +payments.electricityCommon - accruals.electricityCommon : 0,
		management: payments.management >= accruals.management ? +payments.management - accruals.management : 0,
		maintenance: payments.maintenance >= accruals.maintenance ? +payments.maintenance - accruals.maintenance : 0
	}

	// Распределение долгов прошлых периодов пропорционально начислениям
	//prettier-ignore
	let previousPeriodDebts = {
		coldWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWater) || 0,
		coldToHotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldToHotWater) || 0,
		hotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.hotWater) || 0,
		waterDisposal: Math.round((residentsDebts.housing / totalAccruals) * accruals.waterDisposal) || 0,
		heat: Math.round((residentsDebts.housing / totalAccruals) * accruals.heat) || 0,
		heatToHotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.heatToHotWater) || 0,
		electricity: Math.round((residentsDebts.housing / totalAccruals) * accruals.electricity) || 0,
		gasNetwork: Math.round((residentsDebts.housing / totalAccruals) * accruals.gasNetwork) || 0,
		gasLiquid: Math.round((residentsDebts.housing / totalAccruals) * accruals.gasLiquid) || 0,
		solidWasteRemoval: Math.round((residentsDebts.housing / totalAccruals) * accruals.solidWasteRemoval) || 0,
		coldWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWaterCommon) || 0,
		coldToHotWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldToHotWaterCommon) || 0,
		heatToHotWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.heatToHotWaterCommon) || 0,
		hotWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.hotWaterCommon) || 0,
		waterDisposalCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.waterDisposalCommon) || 0,
		electricityCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.electricityCommon) || 0,

		management: Math.round((residentsDebts.housing / totalAccruals) * accruals.management) || 0,
		maintenance: 0
	}

	// Вычисляем сумму всех долгов за прошлые периоды, кроме maintenance
	const totalPreviousPeriodDebtsWithoutMaintenance = Object.values(
		previousPeriodDebts
	).reduce((sum, value) => sum + value, 0)

	// Перезаписываем maintenance
	previousPeriodDebts.maintenance =
		+residentsDebts.housing - totalPreviousPeriodDebtsWithoutMaintenance

	// Расчет долгов. По каждой услуге: Начислено - оплачено за текущий период + долг за прошлый период - оплачен за прошлый период
	//prettier-ignore
	const debts = {
		coldWater: +accruals.coldWater - currentYearPayments.coldWater + previousPeriodDebts.coldWater - previousPeriodPayments.coldWater,
		coldToHotWater: +accruals.coldToHotWater - currentYearPayments.coldToHotWater + previousPeriodDebts.coldToHotWater - previousPeriodPayments.coldToHotWater,
		hotWater: +accruals.hotWater - currentYearPayments.hotWater + previousPeriodDebts.hotWater - previousPeriodPayments.hotWater,
		waterDisposal: +accruals.waterDisposal - currentYearPayments.waterDisposal + previousPeriodDebts.waterDisposal - previousPeriodPayments.waterDisposal,
		heat: +accruals.heat - currentYearPayments.heat + previousPeriodDebts.heat - previousPeriodPayments.heat,
		heatToHotWater: +accruals.heatToHotWater - currentYearPayments.heatToHotWater + previousPeriodDebts.heatToHotWater - previousPeriodPayments.heatToHotWater,
		electricity: +accruals.electricity - currentYearPayments.electricity + previousPeriodDebts.electricity - previousPeriodPayments.electricity,
		gasNetwork: +accruals.gasNetwork - currentYearPayments.gasNetwork + previousPeriodDebts.gasNetwork - previousPeriodPayments.gasNetwork,
		gasLiquid: +accruals.gasLiquid - currentYearPayments.gasLiquid + previousPeriodDebts.gasLiquid - previousPeriodPayments.gasLiquid,
		solidWasteRemoval: +accruals.solidWasteRemoval - currentYearPayments.solidWasteRemoval + previousPeriodDebts.solidWasteRemoval - previousPeriodPayments.solidWasteRemoval,
		coldWaterCommon: +accruals.coldWaterCommon - currentYearPayments.coldWaterCommon + previousPeriodDebts.coldWaterCommon - previousPeriodPayments.coldWaterCommon,
		coldToHotWaterCommon: +accruals.coldToHotWaterCommon - currentYearPayments.coldToHotWaterCommon + previousPeriodDebts.coldToHotWaterCommon - previousPeriodPayments.coldToHotWaterCommon,
		heatToHotWaterCommon: +accruals.heatToHotWaterCommon - currentYearPayments.heatToHotWaterCommon + previousPeriodDebts.heatToHotWaterCommon - previousPeriodPayments.heatToHotWaterCommon,
		hotWaterCommon: +accruals.hotWaterCommon - currentYearPayments.hotWaterCommon + previousPeriodDebts.hotWaterCommon - previousPeriodPayments.hotWaterCommon,
		waterDisposalCommon: +accruals.waterDisposalCommon - currentYearPayments.waterDisposalCommon + previousPeriodDebts.waterDisposalCommon - previousPeriodPayments.waterDisposalCommon,
		electricityCommon: +accruals.electricityCommon - currentYearPayments.electricityCommon + previousPeriodDebts.electricityCommon - previousPeriodPayments.electricityCommon,
		management: +accruals.management - currentYearPayments.management + previousPeriodDebts.management - previousPeriodPayments.management,
		maintenance: +accruals.maintenance - currentYearPayments.maintenance + previousPeriodDebts.maintenance - previousPeriodPayments.maintenance,
	}

	// Общий долг за КУ
	const communalDebts =
		+debts.coldWater +
		debts.coldToHotWater +
		debts.hotWater +
		debts.waterDisposal +
		debts.heat +
		debts.heatToHotWater +
		debts.electricity +
		debts.gasNetwork +
		debts.gasLiquid +
		debts.solidWasteRemoval

	// Общий долг за КР на СОИ
	const commonDebts =
		+debts.coldToHotWaterCommon +
		debts.heatToHotWaterCommon +
		debts.coldWaterCommon +
		debts.hotWaterCommon +
		debts.waterDisposalCommon +
		debts.electricityCommon

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
	const row66 = typicalRow(
		accrualsMaintenance,
		commonAndMaintenancePayments,
		area.residentialArea
	)

	//Строка отчета №76. Вынесена в константу, так как используется в коде несколько раз
	const row76 = typicalRow(
		accruals.electricity,
		payments.electricity,
		calculatedAreas.electricity
	)

	const row86 = {
		4: !!natural.electricityCommon ? natural.electricityCommon : 0,
		6: area.commonArea ? area.commonArea : 0,
		7:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.electricity
				? calculatedAreas.electricity + area.commonArea
				: totalArea
	}

	const row87 = {
		3: natural.heat,
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
			return row66
		}

		if (!elevatorCopy.areaWith) elevatorCopy.areaWith = 0
		if (!elevatorCopy.areaWithout) elevatorCopy.areaWithout = 0

		const results = distributeValues(
			row66,
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
			return row76

		if (!stoveCopy.areaGas) stoveCopy.areaGas = 0
		if (!stoveCopy.areaElectro) stoveCopy.areaElectro = 0

		const results = distributeValues(
			row76,
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
		row66,
		row76,
		distributeMaintenance,
		distributeElectricity,

		row86,
		row87,

		renovation,
		stove,
		waterHeating,
		gasBoiler
	}
}
