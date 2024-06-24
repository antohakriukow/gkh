export const formatNumberValue = (value: string): string => {
	const cleanedValue = value.replace(/[^0-9.,]/g, '')

	const dotParts = cleanedValue.split('.')
	const commaParts = cleanedValue.split(',')
	let formattedValue = cleanedValue
	if (dotParts.length > 2) {
		formattedValue = dotParts.slice(0, 2).join('.') + dotParts.slice(2).join('')
	}
	if (commaParts.length > 2) {
		formattedValue =
			commaParts.slice(0, 2).join(',') + commaParts.slice(2).join('')
	}

	return formattedValue
}
