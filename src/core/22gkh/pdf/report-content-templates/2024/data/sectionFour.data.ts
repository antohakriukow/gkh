import { IReport } from '~/shared/types/report.interface'

import { ISectionNames } from '../../../pdf.interface'

export const sectionFourNames: ISectionNames = {
	section: 'Справочно (заполняется только в отчете за год)',
	stoveHeatingFuel: 'поставка твердого топлива при наличии печного отопления',
	56: 'Электрическая энергия',
	57: 'Тепловая энергия'
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

export const getRow56 = (report: IReport) => [
	{ text: sectionFourNames[56] ? sectionFourNames[56] : '' },
	{ text: 56, alignment: 'center' },
	{},
	{
		text: report.finalReport?.[4]?.[56]?.[4]
			? report.finalReport?.[4][56][4]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4]?.[56]?.[6]
			? report.finalReport?.[4][56][6]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{
		text: report.finalReport?.[4]?.[56]?.[7]
			? report.finalReport?.[4][56][7]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	}
]

export const getRow57 = (report: IReport) => [
	{ text: sectionFourNames[57] ? sectionFourNames[57] : '' },
	{ text: 57, alignment: 'center' },
	{
		text: report.finalReport?.[4]?.[57]?.[3]
			? report.finalReport?.[4][57][3]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4]?.[57]?.[5]
			? report.finalReport?.[4][57][5]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	},
	{},
	{
		text: report.finalReport?.[4]?.[57]?.[7]
			? report.finalReport?.[4][57][7]
			: '',
		alignment: 'center',
		fillColor: '#ffffc2'
	}
]
