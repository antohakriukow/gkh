import { AlignmentType, Paragraph, TextRun } from 'docx'

export const convertToRoubles = (value: string | number) => {
	const [roubles, kopecks] = String(value).split('.')
	const isInteger = kopecks === '0' || !kopecks

	return `${roubles} руб. ${isInteger ? '00' : kopecks.slice(0, 2)} коп.`
}

const leftIndent = '7cm'

export const setEmptyRow = () =>
	new Paragraph({
		children: [new TextRun({ text: ' ' })]
	})

export const setText = (text: string) =>
	new Paragraph({
		children: [new TextRun({ text })],
		alignment: AlignmentType.JUSTIFIED
	})

export const setBoldText = (text: string) =>
	new Paragraph({
		children: [new TextRun({ text, bold: true })],
		alignment: AlignmentType.JUSTIFIED
	})

export const setTextRight = (text: string) =>
	new Paragraph({
		children: [new TextRun({ text })],
		indent: { left: leftIndent }
	})
export const setBoldTextRight = (text: string) =>
	new Paragraph({
		children: [new TextRun({ text, bold: true })],
		indent: { left: leftIndent }
	})

export const setBoldTextCenter = (text: string) =>
	new Paragraph({
		children: [new TextRun({ text, bold: true })],
		alignment: AlignmentType.CENTER
	})
