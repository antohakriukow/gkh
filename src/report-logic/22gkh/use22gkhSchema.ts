import { use22gkhConstants } from './use22gkhConstants'

import { IReport } from '~/shared/types/report.interface'

import { calculatePreviousPayments } from '~/utils/report.utils'

export const use22gkhSchema = (report: IReport) => {
	const {
		area,
		monetizedArea,
		renovationArea,

		accruals,
		accrualsCommunal,
		accrualsCommon,
		accrualsMaintenance,
		totalAccruals,

		payments,
		currentYearPayments,
		previousPeriodPayments,
		communalPayments,
		commonPayments,
		commonAndMaintenancePayments,

		debts,
		residentsDebts,
		maintenanceDebts,
		communalDebts,
		commonDebts,
		currentYearDebts,
		previousPeriodDebts,
		organizationDebts,
		totalOrganizationDebts,

		income,
		elevator,
		gas,
		stove,
		renovation,
		budgetFinancing,
		renovationCosts,

		typicalRow,
		row66,
		row76,
		distributeMaintenance,
		distributeElectricity,
		distributeGas
	} = use22gkhConstants(report)

	const schemaChapterOne = {
		1: { 3: totalAccruals + income.commerce },
		2: { 3: totalAccruals },
		3: { 3: accrualsCommunal },
		4: { 3: accruals.coldWater },
		5: { 3: accruals.hotWater },
		6: { 3: accruals.waterDisposal },
		7: { 3: accruals.heat },
		8: { 3: accruals.electricity },
		9: { 3: accruals.gas },
		10: { 3: accruals.solidWasteRemoval },
		11: { 3: accrualsMaintenance },
		12: { 3: accruals.management },
		13: { 3: accruals.maintenance },
		14: { 3: accrualsCommon },
		15: { 3: income.commerce },

		16: { 3: totalAccruals },
		17: { 3: totalAccruals },
		18: { 3: accrualsCommunal },
		19: { 3: accruals.coldWater },
		20: { 3: accruals.hotWater },
		21: { 3: accruals.waterDisposal },
		22: { 3: accruals.heat },
		23: { 3: accruals.electricity },
		24: { 3: accruals.gas },
		25: { 3: accruals.solidWasteRemoval },
		26: { 3: accrualsMaintenance },
		27: { 3: accruals.management },
		28: { 3: accruals.maintenance },
		29: { 3: accrualsCommon },

		30: { 3: budgetFinancing.totalAmount },
		31: { 3: budgetFinancing.tariffCompensation },

		32: { 3: communalDebts + maintenanceDebts },
		33: { 3: communalDebts },
		34: { 3: debts.coldWater },
		35: { 3: debts.hotWater },
		36: { 3: debts.waterDisposal },
		37: { 3: debts.heat },
		38: { 3: debts.electricity },
		39: { 3: debts.gas },
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
	}

	const schemaChapterTwo = {
		60: { 4: accruals.renovation },
		61: { 4: income.renovation },
		62: { 4: renovationCosts.totalAmount }, // Разделить на 1000
		63: { 4: renovationCosts.budgetTransfers } // Разделить на 1000
	}

	//prettier-ignore
	const schemaChapterThree = {
		64: typicalRow(accrualsMaintenance, commonAndMaintenancePayments),
		66: row66,
		67: distributeMaintenance(67),
		68: distributeMaintenance(68),
		69: typicalRow(accruals.renovation, commonPayments, monetizedArea),
		70: typicalRow(accrualsCommon, income.renovation, renovationArea),
		71: typicalRow(accrualsCommunal, communalPayments),
		72: typicalRow(accruals.coldWater, payments.coldWater, monetizedArea),
		73: typicalRow(accruals.waterDisposal, payments.waterDisposal, monetizedArea),
		74: typicalRow(accruals.hotWater, payments.hotWater, monetizedArea),
		75: typicalRow(accruals.heat, payments.heat, monetizedArea),
		76: row76,
		77: distributeElectricity(77),
		78: distributeElectricity(78),
		79: distributeGas(79),
		80: distributeGas(80),
		81: {}, // Добавить в форму "В том числе в баллонах". Возможно?
		82: {}, // Добавить уголь. Возможно?
		83: {}, // Добавить дрова. Возможно?
		84: typicalRow(accruals.solidWasteRemoval, payments.solidWasteRemoval, monetizedArea),
		85: {
			3: totalAccruals + accruals.renovation,
			4: income.housing + income.renovation,
			5:
				calculatePreviousPayments(commonAndMaintenancePayments, accrualsMaintenance) +
				calculatePreviousPayments(income.renovation, accruals.renovation) +
				calculatePreviousPayments(communalPayments, accrualsCommunal),
			6: totalAccruals + accruals.renovation,
			7: totalAccruals + accruals.renovation
		}
	}

	return { schemaChapterOne, schemaChapterTwo, schemaChapterThree }
}
