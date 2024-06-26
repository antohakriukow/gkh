import { setBoldTextCenter, setEmptyRow } from '../../docx.utils'

export const getTitle = () => [
	setBoldTextCenter('Заявление'),
	setBoldTextCenter('о выдаче судебного приказа'),
	setEmptyRow()
]
