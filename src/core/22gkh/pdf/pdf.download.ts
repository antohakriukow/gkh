import { getMarginLeft, getSectionThreeRow, getSectionTwoRow } from './pdf.utils';

// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { IReport } from '~/shared/types/report.interface';
import { getTitleSection } from './data/title.data';
import {  sectionOneNames, sectionOneTableHeader, sectionOneTitle } from './data/sectionOne.data';
import { getSectionOneRow } from './pdf.utils';
import { INCLUDING, OF_THEM } from './data/shared.data';
import { sectionTwoNames, sectionTwoTableHeader, sectionTwoTitle } from './data/sectionTwo.data';
import { sectionThreeNames, sectionThreeTableHeader, sectionThreeTitle } from './data/sectionThree.data';
import { getRow86, getRow87, sectionFourTableHeader, sectionFourTitle } from './data/sectionFour.data';
import { getSignature } from './data/signature.data';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

/**
 * При вызове функция генерирует шаблон для библиотеки pdfmake, затем на его основе создает PDF и
 * открывает его в новом окне. 
 * @param report - объект отчета, содержащий финальные данные.
*/
export const downloadPDF = (report:IReport) => {
	if (!report.finalReport) return

	const document = {
		pageOrientation: 'landscape',
  content: [
		...getTitleSection(report),
    sectionOneTitle,
    {
		table: {
			widths: ['*', 45, 120],
			body: [
				...sectionOneTableHeader,
        [ { text: sectionOneNames.subSectionOne, bold: true, }, {}, {}, ],
        ...getSectionOneRow(report,sectionOneNames, 1),
        ...getSectionOneRow(report,sectionOneNames, 2, 2, 1 ),
        [{ text: OF_THEM, ...getMarginLeft(2) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames, 3, 3, 2),
        [{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames, 4, 10, 3),
        ...getSectionOneRow(report,sectionOneNames, 11, 11, 2),
        [{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames, 12, 14, 3),
        ...getSectionOneRow(report,sectionOneNames, 15, 15, 2),
        ...getSectionOneRow(report,sectionOneNames, 16),
        ...getSectionOneRow(report,sectionOneNames, 17, 17, 1),
        [{ text: OF_THEM, ...getMarginLeft(2) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames,18, 18, 2),
        [{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames,19,25,3),
        ...getSectionOneRow(report,sectionOneNames,26,26,2),
        [{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames,27,29,3),
        [ { text: sectionOneNames.subSectionTwo, bold: true, }, {}, {}, ],
        ...getSectionOneRow(report,sectionOneNames,30),
        ...getSectionOneRow(report,sectionOneNames,31, 31, 1),
        [ { text: sectionOneNames.subSectionThree, bold: true, }, {}, {}, ],
        ...getSectionOneRow(report,sectionOneNames,32),
        [{ text: INCLUDING, ...getMarginLeft(1) }, {}, {}],
        ...getSectionOneRow(report,sectionOneNames,33,33,1),
        ...getSectionOneRow(report,sectionOneNames,34,40,2),
        ...getSectionOneRow(report,sectionOneNames,41,41,1),
        ...getSectionOneRow(report,sectionOneNames,42,44,2),
        ...getSectionOneRow(report,sectionOneNames,45),
        ...getSectionOneRow(report,sectionOneNames,46,47,1),
        ...getSectionOneRow(report,sectionOneNames,48),
        ...getSectionOneRow(report,sectionOneNames,49,57,1),
        ...getSectionOneRow(report,sectionOneNames,58,59),
			]
		},
	},
  sectionTwoTitle,
  {
		table: {
			widths: ['*', 45, 120, 120],
			body: [
				...sectionTwoTableHeader,
        ...getSectionTwoRow(report,sectionTwoNames,60,63),
			]
		},
	},
  sectionThreeTitle,
  {
		table: {
			widths: ['*', 30, 50, 50, 50, 50, 90, 50],
			body: [
				...sectionThreeTableHeader,
        ...getSectionThreeRow(report,sectionThreeNames,64),
        [{ text: OF_THEM,  ...getMarginLeft(1) }, {}, {}, {}, {}, {}, {}, {}],
        ...getSectionThreeRow(report,sectionThreeNames,65,66,1),
        [{ text: INCLUDING,  ...getMarginLeft(2) }, {}, {}, {}, {}, {}, {}, {}],
        ...getSectionThreeRow(report,sectionThreeNames,67,68,2),
        ...getSectionThreeRow(report,sectionThreeNames,69,69,1),
        ...getSectionThreeRow(report,sectionThreeNames,70),
        ...getSectionThreeRow(report,sectionThreeNames,71),
        ...getSectionThreeRow(report,sectionThreeNames,72,76,1),
        [{ text: INCLUDING,  ...getMarginLeft(2) }, {}, {}, {}, {}, {}, {}, {}],
        ...getSectionThreeRow(report,sectionThreeNames,77,78,2),
        ...getSectionThreeRow(report,sectionThreeNames,79,80,1),
        ...getSectionThreeRow(report,sectionThreeNames,81,81,2),
        [{ text: sectionThreeNames.stoveHeatingFuel,  ...getMarginLeft(1) }, {}, {}, {}, {}, {}, {}, {}],
        ...getSectionThreeRow(report,sectionThreeNames,82,84,1),
        ...getSectionThreeRow(report,sectionThreeNames,85),
			]
		},
	},
  
  report.period === 4 ? sectionFourTitle : {},
  report.period === 4
  ? {
		table: {
			widths: ['*', 45, 90, 90, 90, 90, 90],
			body: [
				...sectionFourTableHeader,
        getRow86(report),
        getRow87(report),
			]
		},
	}
  : {},

  {
    pageBreak: report.period === 4 ? '' : 'before',
    margin: report.period === 4 ? [0,50,0,0] : [0, 0, 0, 0],
		table: {
			widths: [180, 20, 190, 20, 190, 20, 78],
			body: [
				...getSignature(report),
			],
		},
	},
  ]

}

	pdfMake.createPdf(document).open()
}

