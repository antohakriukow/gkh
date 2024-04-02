import { IAccruals } from '~/shared/types/report22gkh.interface'

export const divideAndRoundNumbersMock = {
	coldWater: -1234567.89,
	coldToHotWater: 1234567.89,
	hotWater: 1234567.89,
	waterDisposal: 1234567.89,
	heat: 1234567.89,
	heatToHotWater: 1234567.89,
	gasNetwork: 1234567.89,
	gasLiquid: 1234567.89,
	electricity: 1234567.89,
	solidWasteRemoval: 1234567.89,
	coldWaterCommon: 1234567.89,
	coldToHotWaterCommon: 1234567.89,
	heatToHotWaterCommon: 1234567.89,
	hotWaterCommon: 1234567.89,
	waterDisposalCommon: 1234567.89,
	electricityCommon: 1234567.89,
	management: 1234567.89,
	maintenance: 1234567.89,
	renovation: 1234567.89,
	other: 'TEXT'
} as unknown as IAccruals

export const divideAndRoundNumbersExpectedResult: IAccruals = {
	coldWater: -1235,
	coldToHotWater: 1235,
	hotWater: 1235,
	waterDisposal: 1235,
	heat: 1235,
	heatToHotWater: 1235,
	gasNetwork: 1235,
	gasLiquid: 1235,
	electricity: 1235,
	solidWasteRemoval: 1235,
	coldWaterCommon: 1235,
	coldToHotWaterCommon: 1235,
	heatToHotWaterCommon: 1235,
	hotWaterCommon: 1235,
	waterDisposalCommon: 1235,
	electricityCommon: 1235,
	management: 1235,
	maintenance: 1235,
	renovation: 1235
} as unknown as IAccruals
