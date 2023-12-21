import { IReport } from '~/shared/types/report.interface'

import { ISectionNames } from '../pdf.interface'

export const sectionFourNames: ISectionNames = {
	section: 'Справочно (заполняется только в отчете за год)',
	stoveHeatingFuel: 'поставка твердого топлива при наличии печного отопления',
	86: 'Электрическая энергия',
	87: 'Тепловая энергия'
}

export const sectionFourTitle = {
	text: sectionFourNames.section,
	bold: true,
	alignment: 'center',
	pageBreak: 'before',
	margin: [0, 0, 0, 10]
}

export const sectionFourTableHeader = [
	[
		{
			text: 'Коммунальный ресурс',

			alignment: 'center',

			margin: [0, 30, 0, 0]
		},
		{
			text: '№ строки',
			alignment: 'center'
		},
		{
			text: 'Подано коммунального ресурса населению, проживающему в многоквартирных домах, Гкал',
			alignment: 'center'
		},
		{
			text: 'Подано коммунального ресурса населению на использование и содержание общего имущества в многоквартирных домах, кВт.ч',
			alignment: 'center'
		},
		{
			text: 'Общая площадь жилых помещений в многоквартирных домах, в которые поставляется коммунальный ресурс, м2',
			alignment: 'center'
		},
		{
			text: 'Общая площадь помещений общего пользования в многоквартирных домах, в которые поставляется коммунальный ресурс, м2',
			alignment: 'center'
		},
		{
			text: 'Общая площадь многоквартирных домов, в которые поставляется коммунальный ресурс, м2',
			alignment: 'center'
		}
	],

	[
		{ text: 'А', alignment: 'center' },
		{ text: 'Б', alignment: 'center' },
		{ text: '3', alignment: 'center' },
		{ text: '4', alignment: 'center' },
		{ text: '5', alignment: 'center' },
		{ text: '6', alignment: 'center' },
		{ text: '7', alignment: 'center' }
	]
]

export const getRow86 = (report: IReport) => [
	{ text: sectionFourNames[86] },
	{ text: 86, alignment: 'center' },
	{},
	{
		text: report.finalReport?.[4][86][4],
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4][86][6],
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{
		text: report.finalReport?.[4][86][7],
		alignment: 'center',
		fillColor: '#ffffc2'
	}
]

export const getRow87 = (report: IReport) => [
	{ text: sectionFourNames[87] },
	{ text: 87, alignment: 'center' },
	{
		text: report.finalReport?.[4][87][3],
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4][87][5],
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4][87][7],
		alignment: 'center',
		fillColor: '#ffffc2'
	}
]
