import { ISectionNames } from './pdf.interface'

import { IReport } from '~/shared/types/report.interface'

export const getMarginLeft = (multiplier: number) => ({
	margin: [multiplier * 10, 0, 0, 0]
})

export const getSectionOneRow = (
	report: IReport,
	sectionNames: ISectionNames,
	startRow: number,
	endRow?: number,
	indent?: number
) => {
	if (!report.finalReport) return []

	indent = indent ?? 0
	endRow = endRow ?? startRow

	const rows = []
	for (let i = startRow; i <= endRow; i++) {
		if (report.finalReport[1][i]) {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{
					text: i.toString(),

					alignment: 'center',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0]
				},
				{
					text: report.finalReport[1][i][3].toString(),

					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0]
				}
			])
		} else {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{
					text: i.toString(),
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0],
					alignment: 'center'
				},
				{
					text: '',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0],
					fillColor: '#ffffc2'
				}
			])
		}
	}
	return rows
}

export const getSectionTwoRow = (
	report: IReport,
	sectionNames: ISectionNames,
	startRow: number,
	endRow?: number,
	indent?: number
) => {
	if (!report.finalReport) return []

	indent = indent ?? 0
	endRow = endRow ?? startRow

	const rows = []
	for (let i = startRow; i <= endRow; i++) {
		if (report.finalReport[2] && report.finalReport[2][i]) {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{
					text: i.toString(),
					alignment: 'center',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0]
				},
				{ text: '', fillColor: '#ffffc2' },
				{
					text: report.finalReport[2][i][4].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0]
				}
			])
		} else {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{ text: i.toString(), alignment: 'center' },
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' }
			])
		}
	}
	return rows
}

export const getSectionThreeRow = (
	report: IReport,
	sectionNames: ISectionNames,
	startRow: number,
	endRow?: number,
	indent?: number
) => {
	if (!report.finalReport) return []

	indent = indent ?? 0
	endRow = endRow ?? startRow

	const rows = []
	for (let i = startRow; i <= endRow; i++) {
		if (report.finalReport[3][i]) {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{
					text: i.toString(),
					alignment: 'center',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: report.finalReport[3][i][3].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: report.finalReport[3][i][4].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text:
						report.finalReport[3][i][5] === undefined
							? ''
							: report.finalReport[3][i][5].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: report.finalReport[3][i][6].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: report.finalReport[3][i][7].toString(),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: !!report.finalReport[3][i][8]
						? report.finalReport[3][i][8].toString()
						: '',
					alignment: 'center',
					fillColor: !!report.finalReport[3][i][8] ? '#ffffc2' : '#fff',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				}
			])
		} else {
			rows.push([
				{ text: sectionNames[i], ...getMarginLeft(indent) },
				{
					text: i.toString(),
					alignment: 'center',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' },
				{ text: '', fillColor: '#ffffc2' }
			])
		}
	}

	return rows
}
