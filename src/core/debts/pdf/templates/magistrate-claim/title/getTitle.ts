import { setBoldText, setEmptyRow } from '../../../pdf.utils'

export const getTitle = () => ({
	stack: [
		setBoldText('Заявление'),
		setBoldText('о выдаче судебного приказа'),
		setEmptyRow()
	],
	alignment: 'center',
	bold: false
})
