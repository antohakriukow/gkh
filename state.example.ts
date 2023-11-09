const number = 123
const date = 'Date'
const userId = 123123
const user = {
	userId: {
		settings: {},
		companies: {
			7804237584: {}
		},
		reports: {
			reportId: {
				reportId: number,
				reportType: '22gkh',
				reportTemplate: '22gkh-2023',
				reportCompany: {},
				reportInitialData: {
					data: {
						residentialArea: number,
						nonResidentialArea: number,
						commonArea: number,
						elevator: true || false,
						stove: 'gas' || 'electro',
						gas: 'none' || 'network' || 'liquid',
						renovation: true || false,
						income: {
							housing: number,
							renovation: number,
							commerce: number
						},
						residentsDebts: {
							housing: number,
							renovation: number
						},
						organizationDebts: {
							coldWater: number,
							waterDisposal: number,
							heat: number,
							hotWater: number,
							electricity: number,
							gas: number,
							solidWasteRemoval: number
						},
						accruals: {
							coldWater: number,
							hotWater: number,
							waterDisposal: number,
							heat: number,
							gas: number,
							electricityDay: number,
							electricityNight: number,
							electricitySingle: number,
							solidWasteRemoval: number,
							coldWaterCommon: number,
							hotWaterCommon: number,
							waterDisposalCommon: number,
							electricityDayCommon: number,
							electricityNightCommon: number,
							electricitySingleCommon: number,
							management: number,
							maintenance: number,
							renovation: number
						}
					},
					createdAt: date,
					updatedAt: date,
					ownerId: userId
				}
			}
		}
	}
}
