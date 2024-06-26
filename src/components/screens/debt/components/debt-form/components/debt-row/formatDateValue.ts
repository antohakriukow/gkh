export const formatDateValue = (value: string) => {
	let cleanValue = value.replace(/\D/g, '')

	// Проверка первой цифры дня
	if (cleanValue.length > 0 && parseInt(cleanValue[0]) > 3) {
		cleanValue = cleanValue.replace(/^./, '')
	}
	if (
		cleanValue.length > 1 &&
		parseInt(cleanValue[0]) === 3 &&
		parseInt(cleanValue[1]) > 1
	) {
		cleanValue = cleanValue.slice(0, 1)
	}

	// Проверка первой цифры месяца
	if (cleanValue.length > 2 && parseInt(cleanValue[2]) > 1) {
		cleanValue = cleanValue.replace(/^(.{2})(.)/, '$10')
	}
	// Проверка второй цифры месяца
	if (
		cleanValue.length > 3 &&
		parseInt(cleanValue[2]) === 0 &&
		parseInt(cleanValue[3]) > 9
	) {
		cleanValue = cleanValue.replace(/^(.{3})(.)/, '$10')
	}
	if (
		cleanValue.length > 3 &&
		parseInt(cleanValue[2]) === 1 &&
		parseInt(cleanValue[3]) > 2
	) {
		cleanValue = cleanValue.slice(0, 3)
	}

	// Проверка на нули
	if (cleanValue.length >= 2 && parseInt(cleanValue.slice(0, 2)) === 0) {
		cleanValue = cleanValue.slice(1)
	}
	if (cleanValue.length >= 4 && parseInt(cleanValue.slice(2, 4)) === 0) {
		cleanValue = cleanValue.slice(0, 3)
	}

	// Проверка первой цифры года
	if (cleanValue.length > 4 && parseInt(cleanValue[4]) !== 2) {
		cleanValue = cleanValue.slice(0, 4)
	}
	// Проверка второй цифры года
	if (cleanValue.length > 5 && parseInt(cleanValue[5]) !== 0) {
		cleanValue = cleanValue.slice(0, 5)
	}
	// Проверка третьей цифры года
	if (cleanValue.length > 6 && ![0, 1, 2].includes(parseInt(cleanValue[6]))) {
		cleanValue = cleanValue.slice(0, 6)
	}
	// Проверка четвертой цифры года
	if (cleanValue.length > 7 && parseInt(cleanValue[7]) > 9) {
		cleanValue = cleanValue.slice(0, 7)
	}

	// Добавить точки для разделения
	if (cleanValue.length > 2) {
		cleanValue = cleanValue.slice(0, 2) + '.' + cleanValue.slice(2)
	}
	if (cleanValue.length > 5) {
		cleanValue = cleanValue.slice(0, 5) + '.' + cleanValue.slice(5)
	}

	return cleanValue
}
