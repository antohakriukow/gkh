// @ts-ignore
import {
	getRow56,
	getRow57,
	sectionFourTableHeader,
	sectionFourTitle
} from './data/sectionFour.data'
import {
	sectionOneNames,
	sectionOneTableHeader,
	sectionOneTitle
} from './data/sectionOne.data'
import {
	sectionThreeNames,
	sectionThreeTableHeader,
	sectionThreeTitle
} from './data/sectionThree.data'
import {
	sectionTwoNames,
	sectionTwoTableHeader,
	sectionTwoTitle
} from './data/sectionTwo.data'
import { INCLUDING, OF_THEM } from './data/shared.data'
import { getSignature } from './data/signature.data'
import { getTitleSection } from './data/title.data'

import { IReport } from '~/shared/types/report.interface'

import {
	getMarginLeft,
	getSectionThreeRow,
	getSectionTwoRow
} from '../../pdf.utils'
import { getSectionOneRow } from '../../pdf.utils'

export const reportTemplate2024 = (report: IReport) => {
	const result = [
		...getTitleSection(report),
		sectionOneTitle,
		{
			table: {
				widths: ['*', 45, 120],
				body: [
					...sectionOneTableHeader,
					[{ text: sectionOneNames.subSectionOne, bold: true }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 1),
					...getSectionOneRow(report, sectionOneNames, 2, 2, 1),
					[{ text: OF_THEM, ...getMarginLeft(2) }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 3, 3, 2),
					...getSectionOneRow(report, sectionOneNames, 4, 4, 2),
					[{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 5, 7, 3),
					...getSectionOneRow(report, sectionOneNames, 8, 8, 2),
					...getSectionOneRow(report, sectionOneNames, 9),
					...getSectionOneRow(report, sectionOneNames, 10, 10, 1),
					[{ text: OF_THEM, ...getMarginLeft(2) }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 11, 11, 2),
					...getSectionOneRow(report, sectionOneNames, 12, 12, 2),
					[{ text: INCLUDING, ...getMarginLeft(3) }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 13, 15, 3),
					[{ text: sectionOneNames.subSectionTwo, bold: true }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 16),
					...getSectionOneRow(report, sectionOneNames, 17, 17, 1),
					[{ text: sectionOneNames.subSectionThree, bold: true }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 18),
					[{ text: INCLUDING, ...getMarginLeft(1) }, {}, {}],
					...getSectionOneRow(report, sectionOneNames, 19, 19, 1),
					...getSectionOneRow(report, sectionOneNames, 20, 20, 1),
					...getSectionOneRow(report, sectionOneNames, 21, 23, 2),
					...getSectionOneRow(report, sectionOneNames, 24),
					...getSectionOneRow(report, sectionOneNames, 25, 26, 1),
					...getSectionOneRow(report, sectionOneNames, 27),
					...getSectionOneRow(report, sectionOneNames, 28, 28, 1),
					...getSectionOneRow(report, sectionOneNames, 29, 29, 1),
					...getSectionOneRow(report, sectionOneNames, 30, 31)
				]
			}
		},
		sectionTwoTitle,
		{
			table: {
				widths: ['*', 45, 120, 120],
				body: [
					...sectionTwoTableHeader,
					...getSectionTwoRow(report, sectionTwoNames, 32, 35)
				]
			}
		},
		sectionThreeTitle,
		{
			table: {
				widths: ['*', 30, 50, 50, 50, 50, 90, 50],
				body: [
					...sectionThreeTableHeader,
					...getSectionThreeRow(report, sectionThreeNames, 36),
					[{ text: OF_THEM, ...getMarginLeft(1) }, {}, {}, {}, {}, {}, {}, {}],
					...getSectionThreeRow(report, sectionThreeNames, 37, 38, 1),
					// [{ text: INCLUDING, ...getMarginLeft(2) }, {}, {}, {}, {}, {}, {}, {}],
					// ...getSectionThreeRow(report, sectionThreeNames, 67, 68, 2),
					...getSectionThreeRow(report, sectionThreeNames, 39, 39, 1),
					...getSectionThreeRow(report, sectionThreeNames, 40),
					...getSectionThreeRow(report, sectionThreeNames, 41),
					...getSectionThreeRow(report, sectionThreeNames, 42, 46, 1),
					[
						{ text: INCLUDING, ...getMarginLeft(2) },
						{},
						{},
						{},
						{},
						{},
						{},
						{}
					],
					...getSectionThreeRow(report, sectionThreeNames, 47, 48, 2),
					...getSectionThreeRow(report, sectionThreeNames, 49, 50, 1),
					...getSectionThreeRow(report, sectionThreeNames, 51, 51, 2),
					[
						{ text: sectionThreeNames.stoveHeatingFuel, ...getMarginLeft(1) },
						{},
						{},
						{},
						{},
						{},
						{},
						{}
					],
					...getSectionThreeRow(report, sectionThreeNames, 52, 54, 1),
					...getSectionThreeRow(report, sectionThreeNames, 55)
				]
			}
		}
	]

	if (report.period === 4) {
		result.push(sectionFourTitle, {
			table: {
				widths: ['*', 45, 90, 90, 90, 90, 90],
				body: [
					...sectionFourTableHeader,
					getRow56(report),
					getRow57(report)
					//TODO: к 2025 году доделать раздел 4 (добавились новые строки)
				]
			}
		})
	}

	result.push(
		{ text: '', margin: [0, 0, 0, 10] },
		{
			table: {
				widths: [180, 20, 190, 20, 190, 20, 78],
				body: [...getSignature(report)]
			}
		}
	)

	return result
}
