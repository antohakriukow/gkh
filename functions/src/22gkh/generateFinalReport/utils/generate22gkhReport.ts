import { IFinalReport } from '../../../types/report.interface'
import {
	calculatePreviousPayments,
	removeZeroAndUndefined
} from '../../../utils/report.utils'
import { getConstants } from '../../utils/getConstants'

export const generate22gkhReport = async (
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
		row66,
		row76,
		distributeMaintenance,
		distributeElectricity,

		gasBoiler,
		row86,
		row87
	} = await getConstants(userId, reportId)

	// Секция отчета №1
	const sectionOne = removeZeroAndUndefined({
		1: { 3: totalAccruals - totalVat },
		2: { 3: totalAccruals - accruals.other - totalVat },
		3: { 3: accrualsCommunal - vatCommunal },
		4: {
			3:
				accruals.coldWater +
				accruals.coldToHotWater -
				vat.coldToHotWater -
				vat.coldWater
		},
		5: { 3: accruals.hotWater - vat.hotWater },
		6: { 3: accruals.waterDisposal - vat.waterDisposal },
		7: {
			3: accruals.heat + accruals.heatToHotWater - vat.heat - vat.heatToHotWater
		},
		8: { 3: accruals.electricity - vat.electricity },
		9: {
			3:
				accruals.gasNetwork +
				accruals.gasLiquid -
				vat.gasNetwork -
				vat.gasLiquid
		},
		10: { 3: accruals.solidWasteRemoval - vat.solidWasteRemoval },
		11: { 3: accrualsMaintenance - vatMaintenance },
		12: { 3: accruals.management - vat.management },
		13: { 3: accruals.maintenance - vat.maintenance },
		14: { 3: accrualsCommon - vatCommon },
		15: { 3: accruals.other - vat.other },

		16: { 3: totalAccruals - totalVat },
		17: { 3: totalAccruals - totalVat - accruals.other },
		18: { 3: accrualsCommunal - vatCommunal },
		19: {
			3:
				accruals.coldWater +
				accruals.coldToHotWater -
				vat.coldWater -
				vat.coldToHotWater
		},
		20: { 3: accruals.hotWater - vat.hotWater },
		21: { 3: accruals.waterDisposal - vat.waterDisposal },
		22: {
			3:
				accruals.heat + accruals.heatToHotWater - vat.heat - -vat.heatToHotWater
		},
		23: { 3: accruals.electricity - vat.electricity },
		24: {
			3:
				accruals.gasNetwork +
				accruals.gasLiquid -
				vat.gasNetwork -
				vat.gasLiquid
		},
		25: { 3: accruals.solidWasteRemoval - vat.solidWasteRemoval },
		26: { 3: accrualsMaintenance - vatMaintenance },
		27: { 3: accruals.management - vat.management },
		28: { 3: accruals.maintenance - vat.maintenance },
		29: { 3: accrualsCommon - vatCommon },

		30: { 3: budgetFinancing.totalAmount },
		31: { 3: budgetFinancing.tariffCompensation },

		32: { 3: communalDebts + maintenanceDebts + debts.other },
		33: { 3: communalDebts },
		34: { 3: debts.coldWater + debts.coldToHotWater },
		35: { 3: debts.hotWater },
		36: { 3: debts.waterDisposal },
		37: { 3: debts.heat + debts.heatToHotWater },
		38: { 3: debts.electricity },
		39: { 3: debts.gasNetwork + debts.gasLiquid },
		40: { 3: debts.solidWasteRemoval },
		41: { 3: maintenanceDebts },
		42: { 3: debts.management },
		43: { 3: debts.maintenance },
		44: { 3: commonDebts },

		45: { 3: 0 },
		46: { 3: 0 },
		47: { 3: 0 },

		48: { 3: totalOrganizationDebts },
		49: { 3: totalOrganizationDebts },
		50: { 3: organizationDebts.coldWater },
		51: { 3: organizationDebts.hotWater },
		52: { 3: organizationDebts.waterDisposal },
		53: { 3: organizationDebts.heat },
		54: { 3: organizationDebts.electricity },
		55: { 3: organizationDebts.gas },
		56: { 3: organizationDebts.solidWasteRemoval },

		57: { 3: 0 },
		58: { 3: 0 },
		59: { 3: 0 }
	})

	// Секция отчета №2
	const sectionTwo = removeZeroAndUndefined({
		60: { 4: accruals.renovation },
		61: { 4: income.renovation },
		62: { 4: renovationCosts.totalAmount },
		63: { 4: renovationCosts.budgetTransfers }
	})

	// Секция отчета №3
	//prettier-ignore
	const sectionThree = removeZeroAndUndefined({
		64: typicalRow(accrualsMaintenance, commonAndMaintenancePayments),
		66: row66,
		67: distributeMaintenance(67),
		68: distributeMaintenance(68),
		69: typicalRow(accrualsCommon, commonPayments, accrualsCommonArea),
		70: typicalRow(accruals.renovation, income.renovation, renovationArea),
		71: typicalRow(accrualsCommunal, communalPayments),
		72: typicalRow(
			accruals.coldWater + accruals.coldToHotWater,
			payments.coldWater + payments.coldToHotWater,
			calculatedAreas.coldWater > calculatedAreas.coldToHotWater
				? calculatedAreas.coldWater
				: calculatedAreas.coldToHotWater
		),
		73: typicalRow(
			accruals.waterDisposal,
			payments.waterDisposal,
			calculatedAreas.waterDisposal
		),
		74: typicalRow(
			accruals.hotWater,
			payments.hotWater,
			calculatedAreas.hotWater
		),
		75: typicalRow(
			accruals.heat + accruals.heatToHotWater,
			payments.heat + payments.heatToHotWater,
			calculatedAreas.heat > calculatedAreas.heatToHotWater
				? calculatedAreas.heat
				: calculatedAreas.heatToHotWater
		),
		76: row76,
		77: distributeElectricity(77),
		78: distributeElectricity(78),
		79: typicalRow(
			accruals.gasNetwork,
			payments.gasNetwork,
			calculatedAreas.gasNetwork
		),
		80: typicalRow(
			accruals.gasLiquid,
			payments.gasLiquid,
			calculatedAreas.gasLiquid
		),
		81: {}, // TODO: Добавить в форму "В том числе в баллонах".
		82: {}, // TODO: Добавить уголь.
		83: {}, // TODO: Добавить дрова.
		84: typicalRow(
			accruals.solidWasteRemoval,
			payments.solidWasteRemoval,
			calculatedAreas.solidWasteRemoval
		),
		85: {
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
		86: row86,
		87:
			accruals.heat === 0 &&
			(gasBoiler.status === 'both' || gasBoiler.status === 'yes')
				? {}
				: row87
	})

	return {
		1: sectionOne,
		2: sectionTwo,
		3: sectionThree,
		4: sectionFour,
		generatedAt: Date.now().toString()
	}
}
