// @ts-ignore
import htmlDocx from 'html-docx-js/dist/html-docx'

import { htmlTemplate } from '../pdf/templates/magistrate-new/template'

const generateDocx = (template: string) => {
	const content = template
	const docx = htmlDocx.asBlob(content)
	const link = document.createElement('a')
	link.href = URL.createObjectURL(docx)
	link.download = 'example.docx'
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export const generateMagistrate = () => generateDocx(htmlTemplate)
