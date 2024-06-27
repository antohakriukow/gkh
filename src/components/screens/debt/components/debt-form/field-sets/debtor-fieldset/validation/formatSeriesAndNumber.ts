export const formatSeriesAndNumber = (value: string) => {
	let cleanValue = value.replace(/\D/g, '')

	// Ограничиваем ввод только цифрами
	if (cleanValue.length > 10) {
		cleanValue = cleanValue.slice(0, 10)
	}

	// Добавляем пробел после четвертой цифры
	if (cleanValue.length > 3) {
		cleanValue = cleanValue.slice(0, 4) + ' ' + cleanValue.slice(4)
	}

	return cleanValue
}
