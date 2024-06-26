import { IPrintData } from './interface'
import { downloadMagistrateClaimDOCX } from '~/core/debts/docx/generateDocx'
import {
	downloadDebtDetailsPDF,
	downloadMagistrateClaimPDF,
	downloadPenaltiesDetailsPDF
} from '~/core/debts/pdf/pdf.download'

export const printData: IPrintData[] = [
	{
		type: 'docx',
		printFunction: downloadMagistrateClaimDOCX,
		title: 'Заявление о выдаче судебного приказа'
	},
	{
		type: 'pdf',
		printFunction: downloadMagistrateClaimPDF,
		title: 'Заявление о выдаче судебного приказа'
	},
	{
		type: 'pdf',
		printFunction: downloadDebtDetailsPDF,
		title: 'Расчет задолженности'
	},
	{
		type: 'pdf',
		printFunction: downloadPenaltiesDetailsPDF,
		title: 'Расчет пени'
	}
]
