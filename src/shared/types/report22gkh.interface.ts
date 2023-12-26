export type Type22gkhReportTemplate = '22gkh2023' | '22gkh2024'
export type TypeElevator = 'yes' | 'no' | 'both'
export type TypeStove = 'gas' | 'electro' | 'both'
export type TypeGas = 'none' | 'network' | 'liquid' | 'both'
export type TypeWaterHeating = 'yes' | 'no' | 'both'
export type TypeRenovation = 'yes' | 'no' | 'both'
export type TypeBudgetFinancing = 'yes' | 'no'
export type TypeRenovationCosts = 'yes' | 'no'
export type TypeHousesCount = 'one' | 'many'
export type TypeAreasAreDifferent = 'yes' | 'no'

export interface IService {
	status: boolean
	area: number
}

export interface IArea {
	residentialArea: number
	nonResidentialArea: number
	commonArea: number
}

export interface IServices {
	coldWater: IService
	coldToHotWater: IService
	hotWater: IService
	waterDisposal: IService
	heat: IService
	heatToHotWater: IService
	gas: IService
	electricity: IService
	solidWasteRemoval: IService
	coldWaterCommon: IService
	coldToHotWaterCommon: IService
	hotWaterCommon: IService
	waterDisposalCommon: IService
	electricityCommon: IService
	renovation: IService
}

export interface ISettings {
	housesCount: TypeHousesCount
	areasAreDifferent?: TypeAreasAreDifferent
	services?: IServices
}

export interface IElevator {
	status: TypeElevator
	areaWith?: number
	areaWithout?: number
}

export interface IStove {
	status: TypeStove
	areaElectro?: number
	areaGas?: number
}

export interface IGas {
	status: TypeGas
	areaNone?: number
	areaNetwork?: number
	areaLiquid?: number
}

export interface IWaterHeating {
	status: TypeWaterHeating
}

export interface IRenovation {
	status: TypeRenovation
	areaWith?: number
	areaWithout?: number
}

export interface IBudgetFinancing {
	status: TypeBudgetFinancing
	totalAmount: number
	tariffCompensation: number
}

export interface IRenovationCosts {
	status: TypeRenovationCosts
	totalAmount: number
	budgetTransfers: number
}

export interface INatural {
	electricityCommon: number
	heat: number
}

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
	coldToHotWater: number
	hotWater: number
	waterDisposal: number
	heat: number
	heatToHotWater: number
	gas: number
	electricity: number
	solidWasteRemoval: number
	coldWaterCommon: number
	coldToHotWaterCommon: number
	hotWaterCommon: number
	waterDisposalCommon: number
	electricityCommon: number
	management: number
	maintenance: number
	renovation: number
}

export interface IReport22gkhData {
	area: IArea
	settings: ISettings
	elevator: IElevator
	stove: IStove
	gas: IGas
	waterHeating: IWaterHeating
	renovation: IRenovation
	budgetFinancing: IBudgetFinancing
	renovationCosts: IRenovationCosts
	income: IIncome
	residentsDebts: IResidentsDebts
	organizationDebts: IOrganizationDebts
	accruals: IAccruals
	natural: INatural
	createdAt: Date
	updatedAt: Date
	ownerId: string
}
