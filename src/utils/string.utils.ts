const _camelCaseToKebabCase = (str: string): string => {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const convertXmlAttributes = (xmlStr: string): string => {
	return xmlStr.replace(
		/([a-zA-Z]+)="([^"]*)"/g,
		(_, p1: string, p2: string) => {
			return `${_camelCaseToKebabCase(p1)}="${p2}"`
		}
	)
}

export const extractLastLink = (string: string) => string.split('.').pop()
