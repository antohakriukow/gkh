import { debtDetailsTemplate } from './templates/debt-details/template'
import { magistrateClaimTemplate } from './templates/magistrate-claim/template'
import { penaltiesDetailsTemplate } from './templates/penalties-details/template'
// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { IDebt } from '~/shared/types/debts/debt.interface'

;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

export const downloadPDF = (template: Function, debt: IDebt) => {
	if (!debt.main.total || (!debt.main.total && !debt.penalties.total)) return

	const document = {
		content: template(debt)
	}

	pdfMake.createPdf(document).open()
}

export const downloadMagistrateClaimPDF = (debt: IDebt) =>
	downloadPDF(magistrateClaimTemplate, debt)

export const downloadDebtDetailsPDF = (debt: IDebt) =>
	downloadPDF(debtDetailsTemplate, debt)

export const downloadPenaltiesDetailsPDF = (debt: IDebt) =>
	downloadPDF(penaltiesDetailsTemplate, debt)
