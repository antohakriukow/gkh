export interface iSimplePDFSection {
	title: string
	text: string
}

export interface ISimplePDFData {
	header: string
	data: iSimplePDFSection[]
}
