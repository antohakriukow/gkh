export const convertToRoubles = (value: string | number) => {
	const [roubles, kopecks] = String(value).split('.')
	return `${roubles ?? 0} руб. ${kopecks ?? 0} коп.`
}

export const setEmptyRow = () => ({ text: ' ' })
export const setText = (text: string) => ({ text })
export const setBoldText = (text: string) => ({ text, bold: true })
