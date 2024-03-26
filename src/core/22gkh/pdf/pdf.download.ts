import { reportTemplate2023 } from './report-content-templates/2023/template'
import { reportTemplate2024 } from './report-content-templates/2024/template'
// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { IReport } from '~/shared/types/report.interface'

;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

/**
 * При вызове функция генерирует шаблон для библиотеки pdfmake, затем на его основе создает PDF и
 * открывает его в новом окне.
 * @param report - объект отчета, содержащий финальные данные.
 */
export const downloadPDF = (report: IReport) => {
	if (!report.finalReport) return

	const document = {
		pageOrientation: 'landscape',
		content:
			report.year === 2024
				? reportTemplate2024(report)
				: reportTemplate2023(report)
	}

	pdfMake.createPdf(document).open()
}
