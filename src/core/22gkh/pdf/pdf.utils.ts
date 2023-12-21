import { ISectionNames } from './pdf.interface'

import { IReport } from '~/shared/types/report.interface'

// Добавляет отступ слева, равный 10 х multiplier
export const getMarginLeft = (multiplier: number) => ({
	margin: [multiplier * 10, 0, 0, 0]
})

// Возвращает значение, которое принимает. Если значение не определено, вернет пустую строку.
const getEmptyStringIfNoValue = (value: string | number) =>
	value === undefined ? '' : value.toString()

/**
 * Генерирует строки для второго раздела отчета в PDF-документе.
 *
 * @param report - объект отчета, содержащий финальные данные.
 * @param sectionNames - массив данных с названиями разделов и строк отчета.
 * @param startRow - начальный номер строки.
 * @param endRow - конечный номер строки.
 * @param indent - уровень отступа для строки.
 * @returns Массив строк для второго раздела отчета.
 */
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
				{
					text: getEmptyStringIfNoValue(sectionNames[i]),
					...getMarginLeft(indent)
				},
				{
					text: getEmptyStringIfNoValue(i),
					alignment: 'center',
					margin: [0, sectionNames[i].length > 100 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[1][i][3]),
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

/**
 * Генерирует строки для второго раздела отчета в PDF-документе.
 *
 * @param report - объект отчета, содержащий финальные данные.
 * @param sectionNames - массив данных с названиями разделов и строк отчета.
 * @param startRow - начальный номер строки.
 * @param endRow - конечный номер строки.
 * @param indent - уровень отступа для строки.
 * @returns Массив строк для второго раздела отчета.
 */
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

/**
 * Генерирует строки для третьего раздела отчета в PDF-документе.
 *
 * @param report - объект отчета, содержащий финальные данные.
 * @param sectionNames - массив данных с названиями разделов и строк отчета.
 * @param startRow - начальный номер строки.
 * @param endRow - конечный номер строки.
 * @param indent - уровень отступа для строки.
 * @returns Массив строк для третьего раздела отчета.
 */
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
				{
					text: getEmptyStringIfNoValue(sectionNames[i]),
					...getMarginLeft(indent)
				},
				{
					text: getEmptyStringIfNoValue(i),
					alignment: 'center',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][3]),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][4]),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][5]),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][6]),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][7]),
					alignment: 'center',
					fillColor: '#ffffc2',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				},
				{
					text: getEmptyStringIfNoValue(report.finalReport[3][i][8]),
					alignment: 'center',
					fillColor: !!report.finalReport[3][i][8] ? '#ffffc2' : '#fff',
					margin: [0, sectionNames[i].length > 50 ? 5 : 0, 0, 0]
				}
			])
		} else {
			rows.push([
				{
					text: getEmptyStringIfNoValue(sectionNames[i]),
					...getMarginLeft(indent)
				},
				{
					text: getEmptyStringIfNoValue(i),
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
