// 1. КУ если есть подогрев ХВС для ГВС
export const hasWaterHeatingServicesFieldsData = [
	{
		switcherName: 'data.settings.services.coldToHotWater.status',
		name: 'data.settings.services.coldToHotWater.area',
		placeholder: 'Холодное водоснабжение для ГВС'
	},
	{
		switcherName: 'data.settings.services.heatToHotWater.status',
		name: 'data.settings.services.heatToHotWater.area',
		placeholder: 'Тепловая энергия для ГВС'
	}
]

// 2. КУ если нет подогрева ХВС для ГВС
export const hasNotWaTerHeatingServicesFieldsData = [
	{
		switcherName: 'data.settings.services.hotWater.status',
		name: 'data.settings.services.hotWater.area',
		placeholder: 'ГВС'
	}
]

// 3. Стандартные КУ
export const requiredServicesFieldsData = [
	{
		switcherName: 'data.settings.services.coldWater.status',
		name: 'data.settings.services.coldWater.area',
		placeholder: 'Холодное водоснабжение'
	},
	{
		switcherName: 'data.settings.services.waterDisposal.status',
		name: 'data.settings.services.waterDisposal.area',
		placeholder: 'Водоотведение'
	},
	{
		switcherName: 'data.settings.services.electricity.status',
		name: 'data.settings.services.electricity.area',
		placeholder: 'Электроэнергия'
	},
	{
		switcherName: 'data.settings.services.solidWasteRemoval.status',
		name: 'data.settings.services.solidWasteRemoval.area',
		placeholder: 'Обращение с ТКО'
	},
	{
		switcherName: 'data.settings.services.gasNetwork.status',
		name: 'data.settings.services.gasNetwork.area',
		placeholder: 'Сетевой газ'
	},
	{
		switcherName: 'data.settings.services.gasLiquid.status',
		name: 'data.settings.services.gasLiquid.area',
		placeholder: 'Сжиженный газ'
	}
]

// 5. Отопление
export const heatingServicesData = [
	{
		switcherName: 'data.settings.services.heat.status',
		name: 'data.settings.services.heat.area',
		placeholder: 'Отопление'
	}
]

// 5. Если есть газ
export const gasServicesData = [
	{
		switcherName: 'data.settings.services.gas.status',
		name: 'data.settings.services.gas.area',
		placeholder: 'Газоснабжение'
	}
]

// 6. Стандартные КР на СОИ
export const requiredCommonServicesFieldsData = [
	{
		switcherName: 'data.settings.services.coldWaterCommon.status',
		name: 'data.settings.services.coldWaterCommon.area',
		placeholder: 'Холодное водоснабжение СОИ'
	},
	{
		switcherName: 'data.settings.services.waterDisposalCommon.status',
		name: 'data.settings.services.waterDisposalCommon.area',
		placeholder: 'Водоотведение СОИ'
	},
	{
		switcherName: 'data.settings.services.electricityCommon.status',
		name: 'data.settings.services.electricityCommon.area',
		placeholder: 'Электроэнергия СОИ'
	}
]

// 7. КУ если есть подогрев ХВС для ГВС
export const hasWaterHeatingCommonServicesFieldsData = [
	{
		switcherName: 'data.settings.services.coldToHotWaterCommon.status',
		name: 'data.settings.services.coldToHotWaterCommon.area',
		placeholder: 'Холодное водоснабжение для ГВС СОИ'
	}
]

// 8. КУ если есть подогрев ХВС для ГВС
export const hasNotWaterHeatingCommonServicesFieldsData = [
	{
		switcherName: 'data.settings.services.hotWaterCommon.status',
		name: 'data.settings.services.hotWaterCommon.area',
		placeholder: 'ГВС СОИ'
	}
]
