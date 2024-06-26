import { magistrateClaimTemplate } from './magistrate-claim/template'
import { Document, Packer } from 'docx'
import { saveAs } from 'file-saver'

import { IDebt } from '~/shared/types/debts/debt.interface'

const generateDocx = (template: (debt: IDebt) => Document, debt: IDebt) => {
	Packer.toBlob(template(debt) as Document).then(blob => {
		saveAs(blob, 'example.docx')
	})
}

export const downloadMagistrateClaimDOCX = (debt: IDebt) =>
	generateDocx(magistrateClaimTemplate, debt)
