import { checkCondition } from './checkCondition'

import { ICheckListItem } from '../../../types/report.interface'
import { getConstants } from '../../utils/getConstants'

export const getCheckList = async (
	userId: string,
	reportId: string
): Promise<ICheckListItem[]> => {
	const {
		period,
		area,
		accruals,
		budgetFinancing,
		renovationCosts,
		natural,
		renovation,
		stove,
		waterHeating,
		gasBoiler,
		elevator
	} = await getConstants(userId, reportId)

	let list = [
		checkCondition(
			stove?.status === 'electro' || stove?.status === 'both',
			(accruals?.electricity ?? 0) > 0,
			'warning',
			'В домах с электроплитами должна начисляться плата за электроэнергию при условии отсутствия прямых договоров между РСО и собственниками.'
		),
		checkCondition(
			stove?.status === 'electro' || stove?.status === 'both',
			(accruals?.electricityCommon ?? 0) > 0,
			'error',
			'В домах с электроплитами должна начисляться плата за электроэнергию СОИ.'
		),
		checkCondition(
			(waterHeating?.status === 'yes' || waterHeating?.status === 'both') &&
				gasBoiler?.status === 'no',
			(accruals?.coldToHotWater ?? 0) > 0 &&
				(accruals?.heatToHotWater ?? 0) > 0,
			'error',
			'УО осуществляет подогрев воды с помощью теплоносителя: должна начисляться плата за ХВС для ГВС и Тепловую энергию для ГВС.'
		),
		checkCondition(
			gasBoiler?.status === 'yes' || gasBoiler?.status === 'both',
			(accruals?.gasNetwork ?? 0) > 0 || (accruals?.gasLiquid ?? 0) > 0,
			'error',
			'В домах с газовой котельной должны быть начисления платы за газ (в квитанции скорее всего отражены как тепловая энергия или отопление).'
		),
		checkCondition(
			gasBoiler?.status === 'yes' || gasBoiler?.status === 'both',
			(accruals?.electricityCommon ?? 0) > 0,
			'warning',
			'В домах с газовой котельной должны быть начисления платы за Электроэнергию СОИ (Затраты электроэнергии на работу котельной относятся на статью "Электроэнергия СОИ").'
		),
		checkCondition(
			gasBoiler?.status === 'yes' || gasBoiler?.status === 'both',
			(accruals?.coldWaterCommon ?? 0) > 0,
			'warning',
			'В домах с газовой котельной с высокой вероятностью должны быть начисления платы за ХВС для ГВС.'
		),
		checkCondition(
			renovation?.status === 'yes' || renovation?.status === 'both',
			(accruals?.renovation ?? 0) > 0,
			'error',
			'Если УО начисляет взносы на капитальный ремонт, то сумма начисления должна быть больше нуля.'
		),
		checkCondition(
			renovationCosts?.status === 'yes',
			(renovationCosts?.totalAmount ?? 0) > 0,
			'error',
			'Если УО проводило капитальный ремонт в отчетном периоде, то сумма затрат на капитальный ремонт должна быть больше нуля.'
		),
		checkCondition(
			budgetFinancing?.status === 'yes',
			(budgetFinancing?.totalAmount ?? 0) > 0,
			'error',
			'Если УО получало бюджетное финансирование в отчетном периоде, то сумма финансирования должна быть больше нуля.'
		),
		checkCondition(
			(accruals?.coldWater ?? 0) > 0 ||
				(accruals?.coldToHotWater ?? 0) > 0 ||
				(accruals?.hotWater ?? 0) > 0,
			(accruals?.waterDisposal ?? 0) > 0,
			'error',
			'Если начислена плата за ХВС, ГВС или ХВС для ГВС, то должна быть начислена плата за водоотведение.'
		),
		checkCondition(
			(accruals?.coldWaterCommon ?? 0) > 0 ||
				(accruals?.coldToHotWaterCommon ?? 0) > 0 ||
				(accruals?.hotWaterCommon ?? 0) > 0,
			(accruals?.waterDisposalCommon ?? 0) > 0,
			'error',
			'Если начислена плата за ХВС СОИ, ГВС СОИ или ХВС для ГВС СОИ, то должна быть начислена плата за водоотведение СОИ.'
		),
		checkCondition(
			(accruals?.coldWater ?? 0) > 0 ||
				(accruals?.coldToHotWater ?? 0) > 0 ||
				(accruals?.hotWater ?? 0) > 0,
			(accruals?.waterDisposal ?? 0) > 0,
			'error',
			'Если начислена плата за ХВС, ГВС или ХВС для ГВС, то должна быть начислена плата за водоотведение.'
		),
		checkCondition(
			true,
			accruals?.maintenance > 0,
			'error',
			'Начисления по статье "Содержание и текущий ремонт ОИ" должны быть больше нуля'
		),
		checkCondition(
			true,
			accruals?.management > 0,
			'error',
			'Начисления по статье "Управление МКД" должны быть больше нуля'
		),
		checkCondition(
			true,
			area?.residentialArea + area?.nonResidentialArea + area?.commonArea >=
				(stove?.areaGas ?? 0) + (stove?.areaElectro ?? 0),
			'error',
			'Площадь домов с электроплитами и газовыми плитами не может быть больше суммы жилой площади, нежилой площади и площади МОП'
		),
		checkCondition(
			true,
			area?.residentialArea + area?.nonResidentialArea + area?.commonArea >=
				(elevator?.areaWith ?? 0) + (elevator?.areaWithout ?? 0),
			'error',
			'Площадь домов с лифтами и без лифтов не может быть больше суммы жилой площади, нежилой площади и площади МОП'
		),
		checkCondition(
			true,
			area?.residentialArea + area?.nonResidentialArea + area?.commonArea >=
				(renovation?.areaWith ?? 0) + (renovation?.areaWithout ?? 0),
			'error',
			'Площадь домов с капремонтом и без капремонта не может быть больше суммы жилой площади, нежилой площади и площади МОП'
		),
		checkCondition(
			true,
			area?.residentialArea > area?.nonResidentialArea &&
				area?.residentialArea > area?.commonArea,
			'warning',
			'Жилая площадь обычно больше нежилой площади и площади МОП. Возможно, площади указаны неверно.'
		)
	]

	if (period === 4 && !!natural?.electricityCommon) {
		list.push(
			checkCondition(
				(accruals?.electricityCommon ?? 0) > 0,
				(natural?.electricityCommon ?? 0) > 0,
				'error',
				'В натуральных показателях за год не отражен суммарный объем приобретенной у РСО электроэнергии на СОИ в кВт/ч.'
			),
			checkCondition(
				accruals?.electricityCommon === 0,
				natural?.electricityCommon === 0,
				'error',
				'При отсутствии начисления платы за электроэнергию СОИ в натуральных показателях за год объем электроэнергии в кВт/ч должен быть равен нулю.'
			)
		)
	}

	if (period === 4 && !!natural?.heat) {
		list.push(
			checkCondition(
				(accruals?.heat ?? 0) > 0,
				natural?.heat > 0,
				'error',
				'В натуральных показателях за год не отражен суммарный объем приобретенной у РСО тепловой энергии (только для отопления) в Гкал.'
			),
			checkCondition(
				accruals?.heat === 0,
				natural?.heat === 0,
				'error',
				'При отсутствии начисления платы за отопление в натуральных показателях за год объем тепловой энергии в Гкал должен быть равен нулю.'
			)
		)
	}

	return list
}
