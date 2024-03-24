import { IFinalReport } from '../../../types/report.interface'
import {
	calculatePreviousPayments,
	removeZeroAndUndefined
} from '../../../utils/report.utils'
import { getConstants } from '../../utils/getConstants'

export const generate22gkhReport2024 = async (
	userId: string,
	reportId: string
): Promise<IFinalReport> => {
	const {
		calculatedAreas,
		accrualsCommonArea,
		renovationArea,

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

		typicalRow,
		totalMaintenanceRow,
		totalElectricityRow,
		distributeMaintenance,
		distributeElectricity,

		gasBoiler,
		naturalElectricityRow,
		naturalHeatRow
	} = await getConstants(userId, reportId)

	// Секция отчета №1
	const sectionOne = removeZeroAndUndefined({
		1: { 3: totalAccruals - totalVat },
		2: { 3: totalAccruals - accruals.other - totalVat },
		3: { 3: accrualsCommunal - vatCommunal },
		4: { 3: accrualsMaintenance - vatMaintenance },
		5: { 3: accruals.management - vat.management },
		6: { 3: accruals.maintenance - vat.maintenance },
		7: { 3: accrualsCommon - vatCommon },
		8: { 3: accruals.other - vat.other },

		9: { 3: totalAccruals - totalVat },
		10: { 3: totalAccruals - accruals.other - totalVat },
		11: { 3: accrualsCommunal - vatCommunal },
		12: { 3: accrualsMaintenance - vatMaintenance },
		13: { 3: accruals.management - vat.management },
		14: { 3: accruals.maintenance - vat.maintenance },
		15: { 3: accrualsCommon - vatCommon },

		16: { 3: budgetFinancing.totalAmount },
		17: { 3: budgetFinancing.tariffCompensation },

		18: { 3: communalDebts + maintenanceDebts + debts.other },
		19: { 3: communalDebts },
		20: { 3: maintenanceDebts },
		21: { 3: debts.management },
		22: { 3: debts.maintenance },
		23: { 3: commonDebts },

		24: { 3: 0 },
		25: { 3: 0 },
		26: { 3: 0 },

		27: { 3: totalOrganizationDebts },
		28: { 3: totalOrganizationDebts },

		29: { 3: 0 },
		30: { 3: 0 },
		31: { 3: 0 }
	})

	// Секция отчета №2
	const sectionTwo = removeZeroAndUndefined({
		32: { 4: accruals.renovation },
		33: { 4: income.renovation },
		34: { 4: renovationCosts.totalAmount },
		35: { 4: renovationCosts.budgetTransfers }
	})

	// Секция отчета №3
	//prettier-ignore
	const sectionThree = removeZeroAndUndefined({
		36: typicalRow(accrualsMaintenance, commonAndMaintenancePayments),
		// Строка 37 - найм. 
		38: totalMaintenanceRow,
		39: typicalRow(accrualsCommon, commonPayments, accrualsCommonArea),
		40: typicalRow(accruals.renovation, income.renovation, renovationArea),
		41: typicalRow(accrualsCommunal, communalPayments),
		42: typicalRow(
			accruals.coldWater + accruals.coldToHotWater,
			payments.coldWater + payments.coldToHotWater,
			calculatedAreas.coldWater > calculatedAreas.coldToHotWater
				? calculatedAreas.coldWater
				: calculatedAreas.coldToHotWater
		),
		43: typicalRow(
			accruals.waterDisposal,
			payments.waterDisposal,
			calculatedAreas.waterDisposal
		),
		44: typicalRow(
			accruals.hotWater,
			payments.hotWater,
			calculatedAreas.hotWater
		),
		45: typicalRow(
			accruals.heat + accruals.heatToHotWater,
			payments.heat + payments.heatToHotWater,
			calculatedAreas.heat > calculatedAreas.heatToHotWater
				? calculatedAreas.heat
				: calculatedAreas.heatToHotWater
		),
		46: totalElectricityRow,
		47: distributeElectricity(77),
		48: distributeElectricity(78),
		49: typicalRow(
			accruals.gasNetwork,
			payments.gasNetwork,
			calculatedAreas.gasNetwork
		),
		50: typicalRow(
			accruals.gasLiquid,
			payments.gasLiquid,
			calculatedAreas.gasLiquid
		),
		51: {}, // TODO: Добавить в форму "В том числе в баллонах".
		52: {}, // TODO: Добавить уголь.
		53: {}, // TODO: Добавить дрова.
		54: typicalRow(
			accruals.solidWasteRemoval,
			payments.solidWasteRemoval,
			calculatedAreas.solidWasteRemoval
		),
		55: {
			3: totalAccruals + accruals.renovation - accruals.other,
			4: income.housing + income.renovation - payments.other,
			5:
				calculatePreviousPayments(
					commonAndMaintenancePayments,
					accrualsMaintenance
				) +
				calculatePreviousPayments(income.renovation, accruals.renovation) +
				calculatePreviousPayments(communalPayments, accrualsCommunal),
			6: totalAccruals + accruals.renovation - accruals.other,
			7: totalAccruals + accruals.renovation - accruals.other
		}
	})

	// Секция отчета №4.
	const sectionFour = removeZeroAndUndefined({
		56: naturalElectricityRow,
		57:
			accruals.heat === 0 &&
			(gasBoiler.status === 'both' || gasBoiler.status === 'yes')
				? {}
				: naturalHeatRow
		//TODO: Реализовать строки 58-61 до конца 2024 года
	})

	return {
		1: sectionOne,
		2: sectionTwo,
		3: sectionThree,
		4: sectionFour,
		generatedAt: Date.now().toString()
	}
}
