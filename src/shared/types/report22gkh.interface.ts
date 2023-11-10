export type Type22gkhReportTemplate = '2023' | '2024'
export type TypeStove = 'gas' | 'electro'
export type TypeGas = 'none' | 'network' | 'liquid'

export interface IIncome {
	housing: number
	renovation: number
	commerce: number
}

export interface IResidentsDebts {
	housing: number
	renovation: number
}

export interface IOrganizationDebts {
	coldWater: number
	waterDisposal: number
	heat: number
	hotWater: number
	electricity: number
	gas: number
	solidWasteRemoval: number
}

export interface IAccruals {
	coldWater: number
	hotWater: number
	waterDisposal: number
	heat: number
	gas: number
	electricityDay: number
	electricityNight: number
	electricitySingle: number
	solidWasteRemoval: number
	coldWaterCommon: number
	hotWaterCommon: number
	waterDisposalCommon: number
	electricityDayCommon: number
	electricityNightCommon: number
	electricitySingleCommon: number
	management: number
	maintenance: number
	renovation: number
}

export interface IReport22gkhData {
	residentialArea: number
	nonResidentialArea: number
	commonArea: number
	elevator: boolean
	stove: TypeStove
	gas: TypeGas
	renovation: boolean
	income: IIncome
	residentsDebts: IResidentsDebts
	organizationDebts: IOrganizationDebts
	accruals: IAccruals
	createdAt: Date
	updatedAt: Date
	ownerId: string
}
