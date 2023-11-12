export const convertTimestampToDate = (timestamp: number) => {
	const date = new Date(timestamp)
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Месяцы начинаются с 0
	const year = date.getFullYear()

	return `${day}.${month}.${year}`
}
