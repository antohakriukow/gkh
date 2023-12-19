import {
	IAccruals,
	IBudgetFinancing,
	IIncome,
	IOrganizationDebts,
	IRenovationCosts,
	IResidentsDebts
} from '~/shared/types/report22gkh.interface'
import { IReport } from '~/shared/types/report.interface'

import { divideAndRoundNumbers } from '~/utils/number.utils'
import {
	calculatePreviousPayments,
	distributeValues,
	generateServicesArea
} from '~/utils/report.utils'

export const getConstants = (report: IReport) => {
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

	const monetizedArea = area.residentialArea + area.nonResidentialArea

	const calculatedAreas = generateServicesArea(settings, monetizedArea)

	const renovationArea =
		renovation.status === 'yes'
			? monetizedArea
			: renovation.status === 'both'
			? renovation.areaWith
			: 0

	const accrualsCommunal =
		accruals.coldWater +
		accruals.hotWater +
		accruals.waterDisposal +
		accruals.heat +
		accruals.electricity +
		accruals.gas +
		accruals.solidWasteRemoval

	console.log('accruals.coldWater: ', accruals.coldWater)

	const accrualsCommon =
		accruals.coldWaterCommon +
		accruals.hotWaterCommon +
		accruals.waterDisposalCommon +
		accruals.electricityCommon

	const accrualsMaintenance =
		accruals.management + accruals.maintenance + accrualsCommon

	const totalAccruals = accrualsCommunal + accrualsMaintenance

	// console.log(accrualsCommunal, accrualsMaintenance)

	const totalOrganizationDebts = Object.values(organizationDebts).reduce(
		(sum, value) => sum + value,
		0
	)

	//prettier-ignore
	let payments = {
    coldWater: Math.round((income.housing / totalAccruals) * accruals.coldWater),
    hotWater: Math.round((income.housing / totalAccruals) * accruals.hotWater),
    waterDisposal: Math.round((income.housing / totalAccruals) * accruals.waterDisposal),
    heat: Math.round((income.housing / totalAccruals) * accruals.heat),
    electricity: Math.round((income.housing / totalAccruals) * accruals.electricity),
    gas: Math.round((income.housing / totalAccruals) * accruals.gas),
    solidWasteRemoval: Math.round((income.housing / totalAccruals) * accruals.solidWasteRemoval),
    coldWaterCommon: Math.round((income.housing / totalAccruals) * accruals.coldWaterCommon),
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

	const communalPayments =
		payments.coldWater +
		payments.hotWater +
		payments.waterDisposal +
		payments.heat +
		payments.electricity +
		payments.gas +
		payments.solidWasteRemoval

	const commonPayments =
		payments.coldWaterCommon +
		payments.hotWaterCommon +
		payments.waterDisposalCommon +
		payments.electricityCommon

	const commonAndMaintenancePayments =
		payments.maintenance + payments.management + commonPayments

	//prettier-ignore
	const currentYearPayments = {
		coldWater: payments.coldWater >= accruals.coldWater ? accruals.coldWater : payments.coldWater,
		hotWater: payments.hotWater >= accruals.hotWater ? accruals.hotWater : payments.hotWater,
		waterDisposal: payments.waterDisposal >= accruals.waterDisposal ? accruals.waterDisposal : payments.waterDisposal,
		heat: payments.heat >= accruals.heat ? accruals.heat : payments.heat,
		electricity: payments.electricity >= accruals.electricity ? accruals.electricity : payments.electricity,
		gas: payments.gas >= accruals.gas ? accruals.gas : payments.gas,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? accruals.solidWasteRemoval : payments.solidWasteRemoval,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? accruals.coldWaterCommon : payments.coldWaterCommon,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? accruals.hotWaterCommon : payments.hotWaterCommon,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? accruals.waterDisposalCommon : payments.waterDisposalCommon,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? accruals.electricityCommon : payments.electricityCommon,
		management: payments.management >= accruals.management ? accruals.management : payments.management,
		maintenance: payments.maintenance >= accruals.maintenance ? accruals.maintenance : payments.maintenance
	}

	//prettier-ignore
	const previousPeriodPayments = {
		coldWater: payments.coldWater >= accruals.coldWater ? payments.coldWater - accruals.coldWater : 0,
		hotWater: payments.hotWater >= accruals.hotWater ? payments.hotWater - accruals.hotWater : 0,
		waterDisposal: payments.waterDisposal >= accruals.waterDisposal ? payments.waterDisposal - accruals.waterDisposal : 0,
		heat: payments.heat >= accruals.heat ? payments.heat - accruals.heat : 0,
		electricity: payments.electricity >= accruals.electricity ? payments.electricity - accruals.electricity : 0,
		gas: payments.gas >= accruals.gas ? payments.gas - accruals.gas : 0,
		solidWasteRemoval: payments.solidWasteRemoval >= accruals.solidWasteRemoval ? payments.solidWasteRemoval - accruals.solidWasteRemoval : 0,
		coldWaterCommon: payments.coldWaterCommon >= accruals.coldWaterCommon ? payments.coldWaterCommon - accruals.coldWaterCommon : 0,
		hotWaterCommon: payments.hotWaterCommon >= accruals.hotWaterCommon ? payments.hotWaterCommon - accruals.hotWaterCommon : 0,
		waterDisposalCommon: payments.waterDisposalCommon >= accruals.waterDisposalCommon ? payments.waterDisposalCommon - accruals.waterDisposalCommon : 0,
		electricityCommon: payments.electricityCommon >= accruals.electricityCommon ? payments.electricityCommon - accruals.electricityCommon : 0,
		management: payments.management >= accruals.management ? payments.management - accruals.management : 0,
		maintenance: payments.maintenance >= accruals.maintenance ? payments.maintenance - accruals.maintenance : 0
	}

	//prettier-ignore
	let previousPeriodDebts = {
		coldWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWater),
		hotWater: Math.round((residentsDebts.housing / totalAccruals) * accruals.hotWater),
		waterDisposal: Math.round((residentsDebts.housing / totalAccruals) * accruals.waterDisposal),
		heat: Math.round((residentsDebts.housing / totalAccruals) * accruals.heat),
		electricity: Math.round((residentsDebts.housing / totalAccruals) * accruals.electricity),
		gas: Math.round((residentsDebts.housing / totalAccruals) * accruals.gas),
		solidWasteRemoval: Math.round((residentsDebts.housing / totalAccruals) * accruals.solidWasteRemoval),
		coldWaterCommon: Math.round((residentsDebts.housing / totalAccruals) * accruals.coldWaterCommon),
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

	//prettier-ignore
	const debts = {
		coldWater: accruals.coldWater - currentYearPayments.coldWater + previousPeriodDebts.coldWater - previousPeriodPayments.coldWater,
		hotWater: accruals.hotWater - currentYearPayments.hotWater + previousPeriodDebts.hotWater - previousPeriodPayments.hotWater,
		waterDisposal: accruals.waterDisposal - currentYearPayments.waterDisposal + previousPeriodDebts.waterDisposal - previousPeriodPayments.waterDisposal,
		heat: accruals.heat - currentYearPayments.heat + previousPeriodDebts.heat - previousPeriodPayments.heat,
		electricity: accruals.electricity - currentYearPayments.electricity + previousPeriodDebts.electricity - previousPeriodPayments.electricity,
		gas: accruals.gas - currentYearPayments.gas + previousPeriodDebts.gas - previousPeriodPayments.gas,
		solidWasteRemoval: accruals.solidWasteRemoval - currentYearPayments.solidWasteRemoval + previousPeriodDebts.solidWasteRemoval - previousPeriodPayments.solidWasteRemoval,
		coldWaterCommon: accruals.coldWaterCommon - currentYearPayments.coldWaterCommon + previousPeriodDebts.coldWaterCommon - previousPeriodPayments.coldWaterCommon,
		hotWaterCommon: accruals.hotWaterCommon - currentYearPayments.hotWaterCommon + previousPeriodDebts.hotWaterCommon - previousPeriodPayments.hotWaterCommon,
		waterDisposalCommon: accruals.waterDisposalCommon - currentYearPayments.waterDisposalCommon + previousPeriodDebts.waterDisposalCommon - previousPeriodPayments.waterDisposalCommon,
		electricityCommon: accruals.electricityCommon - currentYearPayments.electricityCommon + previousPeriodDebts.electricityCommon - previousPeriodPayments.electricityCommon,
		management: accruals.management - currentYearPayments.management + previousPeriodDebts.management - previousPeriodPayments.management,
		maintenance: accruals.maintenance - currentYearPayments.maintenance + previousPeriodDebts.maintenance - previousPeriodPayments.maintenance,
	}

	const communalDebts =
		debts.coldWater +
		debts.hotWater +
		debts.waterDisposal +
		debts.heat +
		debts.electricity +
		debts.gas +
		debts.solidWasteRemoval

	const commonDebts =
		debts.coldWaterCommon +
		debts.hotWaterCommon +
		debts.waterDisposalCommon +
		debts.electricityCommon

	const maintenanceDebts = debts.maintenance + debts.management + commonDebts

	const typicalRow = (accruals: number, payments: number, area?: number) => ({
		3: accruals,
		4: payments,
		5: calculatePreviousPayments(payments, accruals),
		6: accruals,
		7: accruals,
		8: !!accruals && !!area ? area : 0
	})

	const row66 = typicalRow(
		accrualsMaintenance,
		commonAndMaintenancePayments,
		monetizedArea
	)

	const row76 = typicalRow(
		accruals.electricity,
		payments.electricity,
		calculatedAreas.electricity
	)

	const rowGas = {
		3: accruals.gas,
		4: payments.gas,
		5: calculatePreviousPayments(payments.gas, accruals.gas),
		6: accruals.gas,
		7: accruals.gas,
		8: monetizedArea // TODO: поработать с площадью
	}

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
		distributeGas
	}
}
