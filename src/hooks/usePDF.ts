// @ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

import { ISimplePDFData } from '~/shared/types/pdf.interface'

;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

export const usePDF = () => {
	const printSimplePDF = (data: ISimplePDFData) => {
		const document = {
			content: [
				{
					text: data.header,
					bold: true,
					alignment: 'center',
					margin: [0, 0, 0, 10]
				},
				data.data.map(section => [
					{
						text: section.title,
						bold: true,
						margin: [0, 0, 0, 5]
					},
					{
						text: section.text,
						margin: [0, 0, 0, 10]
					}
				])
			]
		}
		pdfMake.createPdf(document).open()
	}

	return { printSimplePDF }
}
