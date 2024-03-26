import { IReport } from '~/shared/types/report.interface'

export const getReportCode = (year: number) => {
	switch (year) {
		case 2023:
			return '609226005004'
		case 2024:
			return '609226006004'
		default:
			return '609226006004'
	}
}

export const getReportForm = (year: number) => {
	switch (year) {
		case 2023:
			return '5'
		case 2024:
			return '6'
		default:
			return '6'
	}
}

export const getReportVersion = (year: number) => {
	switch (year) {
		case 2023:
			return '21-11-2022'
		case 2024:
			return '01-03-2024'
		default:
			return '01-03-2024'
	}
}

export const getReportTitle = (data: IReport) => [
	{ _name: 'item', _attrs: { name: 'okpo', value: data.company.okpo } },
	{
		_name: 'item',
		_attrs: { name: 'name', value: data.company.name.full }
	},
	{
		_name: 'item',
		_attrs: { name: 'leader_fio', value: data.company.leader_name }
	},
	{
		_name: 'item',
		_attrs: { name: 'responsible_post', value: data.company.leader_post }
	},
	{
		_name: 'item',
		_attrs: { name: 'responsible_fio', value: data.company.leader_name }
	},
	{
		_name: 'item',
		_attrs: { name: 'phone', value: data.company.phone.toString() }
	},
	{
		_name: 'item',
		_attrs: { name: 'mail', value: data.company.email.toString() }
	}
]
