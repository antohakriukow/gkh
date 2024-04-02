import { IReport } from '~/shared/types/report.interface'

import { convertPeriod } from '~/utils/report/utils'

export const getTitleSection = (report: IReport) => [
	{
		table: {
			widths: ['*'],
			body: [
				[
					{
						text: 'ФЕДЕРАЛЬНОЕ СТАТИСТИЧЕСКОЕ НАБЛЮДЕНИЕ',
						bold: true,
						alignment: 'center'
					}
				]
			]
		}
	},
	{ text: '', margin: [0, 0, 0, 13] },
	{
		table: {
			widths: ['*'],
			body: [
				[
					{
						text: 'КОНФИДЕНЦИАЛЬНОСТЬ ГАРАНТИРУЕТСЯ ПОЛУЧАТЕЛЕМ ИНФОРМАЦИИ',
						alignment: 'center'
					}
				]
			]
		}
	},
	{ text: '', margin: [0, 0, 0, 13] },
	{
		table: {
			widths: ['*'],
			body: [
				[
					{
						text: 'Нарушение порядка представления статистической информации, а равно представление недостоверной статистической информации влечет ответственность, установленную статьей 13.19 Кодекса Российской Федерации об административных правонарушениях от 30.12.2001 No 195-ФЗ, а также статьей 3 Закона Российской Федерации от 13.05.92 No 2761-1 "Об ответственности за нарушение порядка представления государственной статистической отчетности"',
						alignment: 'center'
					}
				]
			]
		}
	},
	{ text: '', margin: [0, 0, 0, 13] },
	{
		table: {
			widths: ['*'],
			body: [
				[
					{
						text: 'ВОЗМОЖНО ПРЕДОСТАВЛЕНИЕ В ЭЛЕКТРОННОМ ВИДЕ',
						bold: true,
						alignment: 'center'
					}
				]
			]
		}
	},
	{ text: '', margin: [0, 0, 0, 13] },
	{
		table: {
			widths: ['*'],
			body: [
				[
					{
						stack: [
							{
								text: '22-ЖКХ (жилище). Сведения о работе организаций, оказывающих услуги в сфере жилищно-коммунального хозяйства, в условиях реформы',
								bold: true,
								alignment: 'center'
							},
							{
								text: `за ${convertPeriod(report.period)} ${report.year} г`,
								bold: true,
								decoration: 'underline',
								alignment: 'center',
								margin: [0, 2, 0, 0]
							},
							{
								text: '(нарастающим итогом)',
								alignment: 'center'
							}
						]
					}
				]
			]
		}
	},
	{ text: '', margin: [0, 0, 0, 13] },
	{
		table: {
			widths: [250],
			body: [
				[
					{
						text: '22-ЖКХ (жилище).Сведения о работе организаций, оказывающих услуги в сфере жилищно-коммунального хозяйства, в условиях реформы',
						bold: true,
						alignment: 'center'
					}
				],
				[{ text: 'Квартальная', bold: true, alignment: 'center' }]
			]
		},
		margin: [502, 0, 0, 0]
	},
	{ text: '', margin: [0, 0, 0, 20] },
	{
		table: {
			widths: [100, '*', '*', '*'],
			body: [
				[
					{
						text: `Наименование отчитывающейся организации:    ${report.company.name.full}`,
						colSpan: 4,
						bold: true
					},
					{},
					{},
					{}
				],
				[
					{ text: `Почтовый адрес:    ${report.company.address}`, colSpan: 4 },
					{},
					{},
					{}
				],
				[
					{
						text: 'Код формы по ОКУД',
						rowSpan: 2,
						alignment: 'center',
						margin: [0, 10, 0, 0]
					},
					{ text: 'Код', colSpan: 3, alignment: 'center' },
					{},
					{}
				],
				[
					'',
					{ text: 'отчитывающейся организации по ОКПО', alignment: 'center' },
					{},
					{}
				],
				[
					{ text: '1', alignment: 'center' },
					{ text: '2', alignment: 'center' },
					{ text: '3', alignment: 'center' },
					{ text: '4', alignment: 'center' }
				],
				[
					{ text: '0609226', alignment: 'center' },
					{ text: report.company.okpo, alignment: 'center' },
					{},
					{}
				]
			]
		},
		margin: [0, 0, 0, 10]
	}
]
