import { getReportData } from './getReport'

import {
	IAccruals,
	IBudgetFinancing,
	IIncome,
	IOrganizationDebts,
	IRenovationCosts,
	IResidentsDebts
} from '../types/report22gkh.interface'
import {
	calculatePreviousPayments,
	distributeValues,
	divideAndRoundNumbers,
	generateServicesArea
} from '../utils/report.utils'

export const getConstants = async (userId: string, reportId: string) => {
	const report = await getReportData(userId, reportId)
	if (!report?.data) {
		throw new Error('Отсутствуют данные отчета')
	}

	const { area, elevator, gas, stove, renovation, settings, natural } =
		report?.data
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

	// Монетизируемая площадь
	const monetizedArea = area.residentialArea + area.nonResidentialArea

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
			? monetizedArea
			: renovation.status === 'both'
			? renovation.areaWith
			: 0

	// Общая сумма начислений КУ
	const accrualsCommunal =
		accruals.coldWater +
		accruals.coldToHotWater +
		accruals.hotWater +
		accruals.waterDisposal +
		accruals.heat +
		accruals.heatToHotWater +
		accruals.electricity +
		accruals.gas +
		accruals.solidWasteRemoval

	// Общая сумма начислений коммунальных ресурсов (КР) на СОИ
	const accrualsCommon =
		accruals.coldWaterCommon +
		accruals.coldToHotWaterCommon +
		accruals.hotWaterCommon +
		accruals.waterDisposalCommon +
		accruals.electricityCommon

	// Общая сумма начислений за ЖУ (Управление МКД, Содержание и текущий ремонт, КР на СОИ)
	const accrualsMaintenance =
		accruals.management + accruals.maintenance + accrualsCommon

	// Сумма начислений за коммунальные услуги и жилищные услуги
	const totalAccruals = accrualsCommunal + accrualsMaintenance

	const totalOrganizationDebts = Object.values(organizationDebts).reduce(
		(sum, value) => sum + value,
		0
	)

	// Распределяем платежи за ЖКУ по услугам пропорционально суммам начисления
	//prettier-ignore
	let payments = {
    coldWater: Math.round((income.housing / totalAccruals) * accruals.coldWater),
    coldToHotWater: Math.round((income.housing / totalAccruals) * accruals.coldToHotWater),
    hotWater: Math.round((income.housing / totalAccruals) * accruals.hotWater),
    waterDisposal: Math.round((income.housing / totalAccruals) * accruals.waterDisposal),
    heat: Math.round((income.housing / totalAccruals) * accruals.heat),
    heatToHotWater: Math.round((income.housing / totalAccruals) * accruals.heatToHotWater),
    electricity: Math.round((income.housing / totalAccruals) * accruals.electricity),
    gas: Math.round((income.housing / totalAccruals) * accruals.gas),
    solidWasteRemoval: Math.round((income.housing / totalAccruals) * accruals.solidWasteRemoval),
    coldWaterCommon: Math.round((income.housing / totalAccruals) * accruals.coldWaterCommon),
    coldToHotWaterCommon: Math.round((income.housing / totalAccruals) * accruals.coldToHotWaterCommon),
    hotWaterCommon: Math.round((income.housing / totalAccruals) * accruals.hotWaterCommon),
    waterDisposalCommon: Math.round((income.housing / totalAccruals) * accruals.waterDisposalCommon),
    electricityCommon: Math.round((income.housing / totalAccruals) * accruals.electricityCommon),
    management: Math.round((income.housing / totalAccruals) * accruals.management),
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
		payments.coldWater +
		payments.coldToHotWater +
		payments.hotWater +
		payments.waterDisposal +
		payments.heat +
		payments.heatToHotWater +
		payments.electricity +
		payments.gas +
		payments.solidWasteRemoval

	// Общая сумма оплат за КР на СОИ
	const commonPayments =
		payments.coldWaterCommon +
		payments.coldToHotWaterCommon +
		payments.hotWaterCommon +
		payments.waterDisposalCommon +
		payments.electricityCommon

	// Общая сумма оплат за ЖУ ("Управление МКД", "Содержание и текущий ремонт", КР на СОИ)
	const commonAndMaintenancePayments =
		payments.maintenance + payments.management + commonPayments

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
		gas: payments.gas >= accruals.gas ? accruals.gas : payments.gas,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? accruals.solidWasteRemoval : payments.solidWasteRemoval,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? accruals.coldWaterCommon : payments.coldWaterCommon,
		coldToHotWaterCommon: payments.coldToHotWaterCommon >= accruals.coldToHotWaterCommon ? accruals.coldToHotWaterCommon : payments.coldToHotWaterCommon,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? accruals.hotWaterCommon : payments.hotWaterCommon,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? accruals.waterDisposalCommon : payments.waterDisposalCommon,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? accruals.electricityCommon : payments.electricityCommon,
		management: payments.management >= accruals.management ? accruals.management : payments.management,
		maintenance: payments.maintenance >= accruals.maintenance ? accruals.maintenance : payments.maintenance
	}

	// Устанавливаем размер оплат в счет предыдущих периодов как разницу между оплатами и начислениями по каждой услуге. Если оплачено меньше, то возвращаем ноль
	//prettier-ignore
	const previousPeriodPayments = {
		coldWater: payments.coldWater >= accruals.coldWater ? payments.coldWater - accruals.coldWater : 0,
		coldToHotWater: payments.coldToHotWater >= accruals.coldToHotWater ? payments.coldToHotWater - accruals.coldToHotWater : 0,
		hotWater: payments.hotWater >= accruals.hotWater ? payments.hotWater - accruals.hotWater : 0,
		waterDisposal: payments.waterDisposal >= accruals.waterDisposal ? payments.waterDisposal - accruals.waterDisposal : 0,
		heat: payments.heat >= accruals.heat ? payments.heat - accruals.heat : 0,
		heatToHotWater: payments.heatToHotWater >= accruals.heatToHotWater ? payments.heatToHotWater - accruals.heatToHotWater : 0,
		electricity: payments.electricity >= accruals.electricity ? payments.electricity - accruals.electricity : 0,
		gas: payments.gas >= accruals.gas ? payments.gas - accruals.gas : 0,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? payments.solidWasteRemoval - accruals.solidWasteRemoval : 0,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? payments.coldWaterCommon - accruals.coldWaterCommon : 0,
		coldToHotWaterCommon: payments.coldToHotWaterCommon >= accruals.coldToHotWaterCommon ? payments.coldToHotWaterCommon - accruals.coldToHotWaterCommon : 0,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? payments.hotWaterCommon - accruals.hotWaterCommon : 0,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? payments.waterDisposalCommon - accruals.waterDisposalCommon : 0,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? payments.electricityCommon - accruals.electricityCommon : 0,
		management: payments.management >= accruals.management ? payments.management - accruals.management : 0,
		maintenance: payments.maintenance >= accruals.maintenance ? payments.maintenance - accruals.maintenance : 0
	}

	// Распределение долгов прошлых периодов пропорционально начислениям
	//prettier-ignore
	let previousPeriodDebts = {
		coldWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWater),
		coldToHotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldToHotWater),
		hotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.hotWater),
		waterDisposal: Math.round((residentsDebts.housing / totalAccruals) * accruals.waterDisposal),
		heat: Math.round((residentsDebts.housing / totalAccruals) * accruals.heat),
		heatToHotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.heatToHotWater),
		electricity: Math.round((residentsDebts.housing / totalAccruals) * accruals.electricity),
		gas: Math.round((residentsDebts.housing / totalAccruals) * accruals.gas),
		solidWasteRemoval: Math.round((residentsDebts.housing / totalAccruals) * accruals.solidWasteRemoval),
		coldWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWaterCommon),
		coldToHotWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldToHotWaterCommon),
		hotWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.hotWaterCommon),
		waterDisposalCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.waterDisposalCommon),
		electricityCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.electricityCommon),

		management: Math.round((residentsDebts.housing / totalAccruals) * accruals.management),
		maintenance: 0
	}

	// Вычисляем сумму всех долгов за прошлые периоды, кроме maintenance
	const totalPreviousPeriodDebtsWithoutMaintenance = Object.values(
		previousPeriodDebts
	).reduce((sum, value) => sum + value, 0)

	// Перезаписываем maintenance
	previousPeriodDebts.maintenance =
		residentsDebts.housing - totalPreviousPeriodDebtsWithoutMaintenance

	// Расчет долгов. По каждой услуге: Начислено - оплачено за текущий период + долг за прошлый период - оплачен за прошлый период
	//prettier-ignore
	const debts = {
		coldWater: accruals.coldWater - currentYearPayments.coldWater + previousPeriodDebts.coldWater - previousPeriodPayments.coldWater,
		coldToHotWater: accruals.coldToHotWater - currentYearPayments.coldToHotWater + previousPeriodDebts.coldToHotWater - previousPeriodPayments.coldToHotWater,
		hotWater: accruals.hotWater - currentYearPayments.hotWater + previousPeriodDebts.hotWater - previousPeriodPayments.hotWater,
		waterDisposal: accruals.waterDisposal - currentYearPayments.waterDisposal + previousPeriodDebts.waterDisposal - previousPeriodPayments.waterDisposal,
		heat: accruals.heat - currentYearPayments.heat + previousPeriodDebts.heat - previousPeriodPayments.heat,
		heatToHotWater: accruals.heatToHotWater - currentYearPayments.heatToHotWater + previousPeriodDebts.heatToHotWater - previousPeriodPayments.heatToHotWater,
		electricity: accruals.electricity - currentYearPayments.electricity + previousPeriodDebts.electricity - previousPeriodPayments.electricity,
		gas: accruals.gas - currentYearPayments.gas + previousPeriodDebts.gas - previousPeriodPayments.gas,
		solidWasteRemoval: accruals.solidWasteRemoval - currentYearPayments.solidWasteRemoval + previousPeriodDebts.solidWasteRemoval - previousPeriodPayments.solidWasteRemoval,
		coldWaterCommon: accruals.coldWaterCommon - currentYearPayments.coldWaterCommon + previousPeriodDebts.coldWaterCommon - previousPeriodPayments.coldWaterCommon,
		coldToHotWaterCommon: accruals.coldToHotWaterCommon - currentYearPayments.coldToHotWaterCommon + previousPeriodDebts.coldToHotWaterCommon - previousPeriodPayments.coldToHotWaterCommon,
		hotWaterCommon: accruals.hotWaterCommon - currentYearPayments.hotWaterCommon + previousPeriodDebts.hotWaterCommon - previousPeriodPayments.hotWaterCommon,
		waterDisposalCommon: accruals.waterDisposalCommon - currentYearPayments.waterDisposalCommon + previousPeriodDebts.waterDisposalCommon - previousPeriodPayments.waterDisposalCommon,
		electricityCommon: accruals.electricityCommon - currentYearPayments.electricityCommon + previousPeriodDebts.electricityCommon - previousPeriodPayments.electricityCommon,
		management: accruals.management - currentYearPayments.management + previousPeriodDebts.management - previousPeriodPayments.management,
		maintenance: accruals.maintenance - currentYearPayments.maintenance + previousPeriodDebts.maintenance - previousPeriodPayments.maintenance,
	}

	// Общий долг за КУ
	const communalDebts =
		debts.coldWater +
		debts.coldToHotWater +
		debts.hotWater +
		debts.waterDisposal +
		debts.heat +
		debts.heatToHotWater +
		debts.electricity +
		debts.gas +
		debts.solidWasteRemoval

	// Общий долг за КР на СОИ
	const commonDebts =
		debts.coldToHotWaterCommon +
		debts.coldWaterCommon +
		debts.hotWaterCommon +
		debts.waterDisposalCommon +
		debts.electricityCommon

	// Общий долг за ЖУ
	const maintenanceDebts = debts.maintenance + debts.management + commonDebts

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
				? calculatedAreas.electricity
				: monetizedArea
	}

	const row87 = {
		3: natural.heat,
		5:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.heat
				? calculatedAreas.heat
				: area.residentialArea,
		7:
			settings.areasAreDifferent === 'yes' && !!calculatedAreas.heat
				? calculatedAreas.heat
				: monetizedArea
	}

	//Строка отчета с данными о газоснабжении. Вынесена в константу, так как используется в коде несколько раз
	const rowGas = {
		3: accruals.gas,
		4: payments.gas,
		5: calculatePreviousPayments(payments.gas, accruals.gas),
		6: accruals.gas,
		7: accruals.gas,
		8: monetizedArea // TODO: поработать с площадью
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

	/**
	 * Распределяет расходы на газ в зависимости от его источника.
	 * @param row - Строка данных для распределения.
	 * @returns Объект с распределенными значениями.
	 */
	const distributeGas = (row: 79 | 80) => {
		const gasCopy = { ...gas }
		if (
			(row === 79 && gas.status === 'network') ||
			(row === 80 && gas.status === 'liquid')
		)
			return rowGas

		if (!gasCopy.areaNetwork) gasCopy.areaNetwork = 0
		if (!gasCopy.areaLiquid) gasCopy.areaLiquid = 0
		if (!gasCopy.areaNone) gasCopy.areaNone = 0

		const results = distributeValues(
			rowGas,
			gasCopy.areaNetwork,
			gasCopy.areaLiquid,
			gasCopy.areaNone
		)

		return row === 79 ? results[0] : results[1]
	}

	return {
		calculatedAreas,
		area,
		monetizedArea,
		renovationArea,

		accruals,
		accrualsCommunal,
		accrualsCommon,
		accrualsMaintenance,
		totalAccruals,

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
		distributeGas,

		row86,
		row87
	}
}
