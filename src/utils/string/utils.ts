export const camelCaseToKebabCase = (str: string): string => {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Конвертирует атрибуты XML из camelCase в kebab-case.
 *
 * Эта функция используется для преобразования строковых XML-данных,
 * изменяя формат именования атрибутов из camelCase (например, "someAttribute")
 * в kebab-case (например, "some-attribute").
 *
 * @param xmlStr - Строка XML для преобразования.
 * @returns Преобразованная строка XML с атрибутами в формате kebab-case.
 */
export const convertXmlAttributes = (xmlStr: string): string => {
	return xmlStr.replace(
		/([a-zA-Z]+)="([^"]*)"/g,
		(_, p1: string, p2: string) => {
			return `${camelCaseToKebabCase(p1)}="${p2}"`
		}
	)
}

export const extractLastLink = (input: unknown): string | undefined => {
	if (typeof input !== 'string') {
		throw new TypeError('Expected a string')
	}
	return input.split('.').pop()
}

export const convertLineBreaksToHTML = (text: string) => {
	return text.replace(/\n/g, '<br/>')
}

export function trimStringAtSymbol(str: string, symbol: string) {
	const index = str.indexOf(symbol)

	if (index !== -1) {
		return str.slice(0, index)
	}

	return str
}
