import { IReport } from '~/shared/types/report.interface'

import { convertTimestampToDate } from '~/utils/time/utils'

export const getSignature = (report: IReport) => [
	[
		{
			text: 'Должностное лицо, ответственное за предоставление статистической информации (лицо, уполномоченное предоставлять статистическую информацию от имени юридического лица)',
			border: [false, false, false, false],
			fontSize: 10
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: report.company.leader_post,
			alignment: 'center',
			border: [false, false, false, true],
			margin: [0, 60, 0, 0]
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: report.company.leader_name,
			alignment: 'center',
			border: [false, false, false, true],
			margin: [0, 60, 0, 0]
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: '',
			alignment: 'center',
			border: [false, false, false, true]
		}
	],

	[
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{
			text: '(должность)',
			fontSize: 10,
			alignment: 'center',
			border: [false, false, false, false]
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: '(Ф.И.О.)',
			fontSize: 10,
			alignment: 'center',
			border: [false, false, false, false]
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: '(подпись)',
			fontSize: 10,
			alignment: 'center',
			border: [false, false, false, false]
		}
	],

	[
		{ text: '', border: [false, false, false, false], margin: [0, 20, 0, 0] },
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] }
	],

	[
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{
			text: report.company.phone,
			alignment: 'center',
			border: [false, false, false, true]
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: convertTimestampToDate(+report.updatedAt),
			alignment: 'center',
			border: [false, false, false, true]
		},
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] }
	],

	[
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] },
		{
			text: 'Номер контактного телефона',
			border: [false, false, false, false],
			fontSize: 10,
			alignment: 'center'
		},
		{ text: '', border: [false, false, false, false] },
		{
			text: 'Дата составления документа',
			border: [false, false, false, false],
			fontSize: 10,
			alignment: 'center'
		},
		{ text: '', border: [false, false, false, false] },
		{ text: '', border: [false, false, false, false] }
	]
]
