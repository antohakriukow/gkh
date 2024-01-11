export const serviceKeys = [
	'coldWater',
	'coldToHotWater',
	'hotWater',
	'waterDisposal',
	'heat',
	'heatToHotWater',
	'electricity',
	'gasNetwork',
	'gasLiquid',
	'solidWasteRemoval',
	'coldWaterCommon',
	'coldToHotWaterCommon',
	'heatToHotWaterCommon',
	'hotWaterCommon',
	'waterDisposalCommon',
	'electricityCommon',
	'management',
	'other',
	'maintenance'
] as const

export const sumValues = (obj: Record<string, number>): number => {
	return Object.values(obj).reduce((sum, value) => sum + value, 0)
}

export const replaceNegativeValuesWithZero = <T extends Record<string, number>>(
	obj: T
): T => {
	const result: Record<string, number> = {}

	for (const key in obj) {
		result[key] = obj[key] < 0 ? 0 : obj[key]
	}

	return result as T
}

export type TypeServiceKey = (typeof serviceKeys)[number]

export const getServiceKeys = (exclude: TypeServiceKey[]) => {
	return serviceKeys.filter(key => !exclude.includes(key))
}

export const removeNonResidentialShare = (
	value: number,
	residentialArea: number,
	nonResidentialArea: number
) =>
	Math.ceil((value * residentialArea) / (residentialArea + nonResidentialArea))

export const distributePayments = (
	income: number,
	totalAccruals: number,
	accruals: number
) => Math.ceil((income / totalAccruals) * accruals) || 0

export const getCurrentYearPayments = (payments: number, accruals: number) =>
	payments >= accruals ? accruals : payments

export const getPreviousPeriodPayments = (
	payments: number,
	accruals: number
) => (payments >= accruals ? +payments - accruals : 0)

export const getPreviousPeriodDebts = (
	debts: number,
	totalAccruals: number,
	accruals: number
) => Math.ceil((debts / totalAccruals) * accruals) || 0

export const getDebts = (
	accruals: number,
	currentYearPayments: number,
	previousPeriodDebts: number,
	previousPeriodPayments: number
) => {
	const result =
		+accruals -
		currentYearPayments +
		previousPeriodDebts -
		previousPeriodPayments

	return result > 0 ? result : 0
}

export const getCommunal = (obj: Record<TypeServiceKey, number>): number => {
	const communalKeys: TypeServiceKey[] = [
		'coldWater',
		'coldToHotWater',
		'hotWater',
		'waterDisposal',
		'heat',
		'heatToHotWater',
		'electricity',
		'gasNetwork',
		'gasLiquid',
		'solidWasteRemoval'
	]

	return communalKeys.reduce((sum, key) => {
		return sum + (obj[key] || 0)
	}, 0)
}

export const getCommon = (obj: Record<TypeServiceKey, number>): number => {
	const commonKeys: TypeServiceKey[] = [
		'coldWaterCommon',
		'coldToHotWaterCommon',
		'heatToHotWaterCommon',
		'hotWaterCommon',
		'waterDisposalCommon',
		'electricityCommon'
	]

	return commonKeys.reduce((sum, key) => {
		return sum + (obj[key] || 0)
	}, 0)
}
