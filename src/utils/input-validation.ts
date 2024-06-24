import dayjs from 'dayjs'

export const validateDate = (value: string) => {
	const datePattern =
		/^(0[1-9]|[12][0-9]|3[01])[./](0[1-9]|1[0-2])[./](19|20)\d\d$/

	if (!datePattern.test(value)) {
		return 'Введите дату в формате ДД.ММ.ГГГГ'
	}

	const inputDate = dayjs(value, 'DD.MM.YYYY')
	const today = dayjs()

	if (inputDate.isAfter(today)) {
		return 'Дата не может быть больше текущей'
	}

	return true
}

export const validateNumber = (value: string) => {
	const numberPattern = /^[1-9]\d*(\.\d{1,2})?$/
	return numberPattern.test(value) || 'Неверный формат'
}
