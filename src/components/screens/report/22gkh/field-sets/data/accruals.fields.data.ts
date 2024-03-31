export const accrualsFieldsData = [
	{
		name: 'data.accruals.coldWater',
		placeholder: 'Холодное водоснабжение, руб'
	},
	{
		name: 'data.accruals.coldToHotWater',
		placeholder: 'Холодное водоснабжение для ГВС, руб'
	},
	{ name: 'data.accruals.hotWater', placeholder: 'Горячее водоснабжение, руб' },
	{ name: 'data.accruals.waterDisposal', placeholder: 'Водоотведение, руб' },
	{ name: 'data.accruals.heat', placeholder: 'Отопление, руб' },
	{
		name: 'data.accruals.heatToHotWater',
		placeholder: 'Тепловая энергия для ГВС, руб'
	},
	{
		name: 'data.accruals.solidWasteRemoval',
		placeholder: 'Обращение с ТКО, руб'
	},
	{ name: 'data.accruals.electricity', placeholder: 'Электроэнергия, руб' },
	{ name: 'data.accruals.gasNetwork', placeholder: 'Сетевой газ, руб' },
	{ name: 'data.accruals.gasLiquid', placeholder: 'Сжиженный газ, руб' },
	{
		name: 'data.accruals.coldWaterCommon',
		placeholder: 'Холодное водоснабжение СОИ, руб'
	},
	{
		name: 'data.accruals.coldToHotWaterCommon',
		placeholder: 'Холодное водоснабжение для ГВС СОИ, руб'
	},
	{
		name: 'data.accruals.hotWaterCommon',
		placeholder: 'Горячее водоснабжение СОИ, руб'
	},
	{
		name: 'data.accruals.waterDisposalCommon',
		placeholder: 'Водоотведение СОИ, руб'
	},
	{
		name: 'data.accruals.heatToHotWaterCommon',
		placeholder: 'Тепловая энергия для ГВС СОИ, руб'
	},
	{
		name: 'data.accruals.electricityCommon',
		placeholder: 'Электроэнергия СОИ, руб'
	}
]

const defaultTooltip = 'См. инструкции (Нажмите на вопрос вверху)'

export const requiredAccrualsFieldsData = [
	{
		name: 'data.accruals.management',
		placeholder: 'Управление МКД, руб',
		tooltip: defaultTooltip
	},
	{
		name: 'data.accruals.maintenance',
		placeholder: 'Содержание и текущий ремонт ОИ, руб',
		tooltip: defaultTooltip
	},
	{
		name: 'data.accruals.other',
		placeholder: 'Прочие услуги, руб',
		tooltip: defaultTooltip
	}
]

export const renovationAccrualsData = {
	name: 'data.accruals.renovation',
	placeholder: 'Взносы на капремонт, руб'
}
