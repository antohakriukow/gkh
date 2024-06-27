export const formatSnilsValue = (value: string) => {
	let cleanValue = value.replace(/\D/g, '')

	// Ограничиваем ввод только цифрами
	if (cleanValue.length > 11) {
		cleanValue = cleanValue.slice(0, 11)
	}

	// Добавляем тире и пробел для формата СНИЛС
	if (cleanValue.length > 2) {
		cleanValue = cleanValue.slice(0, 3) + '-' + cleanValue.slice(3)
	}
	if (cleanValue.length > 6) {
		cleanValue = cleanValue.slice(0, 7) + '-' + cleanValue.slice(7)
	}
	if (cleanValue.length > 10) {
		cleanValue = cleanValue.slice(0, 11) + ' ' + cleanValue.slice(11)
	}

	return cleanValue
}
