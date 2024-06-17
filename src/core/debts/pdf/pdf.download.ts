import { getMagistrateClaimContent } from './templates/magistrate/magistrate.template'
// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { IDebt } from '~/shared/types/debts/debt.interface'

;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

/**
 * При вызове функция генерирует шаблон для библиотеки pdfmake, затем на его основе создает PDF и
 * открывает его в новом окне.
 * @param report - объект отчета, содержащий финальные данные.
 */
export const downloadPDF = (debt: IDebt) => {
	if (!debt.main.total || (!debt.main.total && !debt.penalties.total)) return

	const document = {
		content: getMagistrateClaimContent(debt)
	}

	pdfMake.createPdf(document).open()
}
