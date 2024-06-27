export const formatNumberWithMaxLength = (value: string, maxLength: number) => {
	// Удаляем все нецифровые символы
	let cleanValue = value.replace(/\D/g, '')

	// Проверяем первую цифру и удаляем все символы, если первая цифра не является цифрой
	if (value.length > 0 && !/^\d/.test(value[0])) {
		cleanValue = cleanValue.slice(1)
	}

	// Обрезаем значение до максимальной длины
	if (cleanValue.length > maxLength) {
		cleanValue = cleanValue.slice(0, maxLength)
	}

	return cleanValue
}
