export const convertToRoubles = (value: string | number) => {
	const [roubles, kopecks] = String(value).split('.')
	const isInteger = kopecks === '0' || !kopecks

	return `${roubles} руб. ${isInteger ? '00' : kopecks.slice(0, 2)} коп.`
}

export const setEmptyRow = () => ({ text: ' ' })
export const setText = (text: string) => ({ text })
export const setBoldText = (text: string) => ({ text, bold: true })
