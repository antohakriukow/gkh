import { TypeServiceKey } from './utils/helpers'

import {
	IAccruals,
	IArea,
	IBudgetFinancing,
	IElevator,
	IGasBoiler,
	IIncome,
	INatural,
	IOrganizationDebts,
	IRenovation,
	IRenovationCosts,
	IStove,
	IWaterHeating
} from '../../../src/shared/types/report22gkh.interface'

type TypeRowWithNumbers = {
	[key: number]: number
}

type TypeRowWithStrings = {
	[key: string]: number
}

type TypeTypicalRow = (
	accruals: number,
	payments: number,
	area?: number
) => TypeRowWithNumbers

type TypeDistributeMaintenance = (
	row: 67 | 68
) => TypeRowWithNumbers | TypeRowWithStrings

type TypeDistributeElectricity = (
	row: 77 | 78
) => TypeRowWithNumbers | TypeRowWithStrings

export interface IConstants {
	period: number

	calculatedAreas: { [key: string]: number }
	area: IArea
	monetizedArea: number
	renovationArea: number | undefined
	accrualsCommonArea: number

	accruals: IAccruals
	accrualsCommunal: number
	accrualsCommon: number
	accrualsMaintenance: number
	totalAccruals: number

	vat: Record<TypeServiceKey, number>
	vatCommunal: number
	vatCommon: number
	vatMaintenance: number
	totalVat: number

	payments: Record<TypeServiceKey, number>

	communalPayments: number
	commonPayments: number
	commonAndMaintenancePayments: number

	debts: Record<TypeServiceKey, number>
	maintenanceDebts: number
	communalDebts: number
	commonDebts: number
	organizationDebts: IOrganizationDebts
	totalOrganizationDebts: number

	income: IIncome
	budgetFinancing: IBudgetFinancing
	renovationCosts: IRenovationCosts
	natural: INatural

	typicalRow: TypeTypicalRow
	totalMaintenanceRow: TypeRowWithNumbers
	totalElectricityRow: TypeRowWithNumbers
	distributeMaintenance: TypeDistributeMaintenance
	distributeElectricity: TypeDistributeElectricity

	naturalElectricityRow: TypeRowWithNumbers
	naturalHeatRow: TypeRowWithNumbers

	renovation: IRenovation
	stove: IStove
	waterHeating: IWaterHeating
	gasBoiler: IGasBoiler
	elevator: IElevator
}
