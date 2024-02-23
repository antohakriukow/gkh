import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'

dayjs.extend(minMax)

// export const convertTimestampToDate = (timestamp: number) => {
// 	const date = new Date(timestamp)
// 	const day = date.getDate().toString().padStart(2, '0')
// 	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Месяцы начинаются с 0
// 	const year = date.getFullYear()

// 	return `${day}.${month}.${year}`
// }

export const convertTimestampToDate = (timestamp: number): string =>
	dayjs(timestamp).format('DD.MM.YYYY')

export const convertTimestampToDateWithTime = (timestamp: number): string =>
	dayjs(timestamp).format('DD.MM.YYYY HH:mm')

export const GetDateIntervalBoundaries = (data: string[]) => {
	if (data.length === 0) {
		return { earliest: null, latest: null }
	}

	const dates = data.map(item => dayjs(item, 'DD.MM.YYYY HH:mm:ss'))

	const earliestDate = dates.length > 0 ? dayjs.min(dates) : null
	const latestDate = dates.length > 0 ? dayjs.max(dates) : null

	return {
		earliest: earliestDate ? earliestDate.format('DD.MM.YYYY') : null,
		latest: latestDate ? latestDate.format('DD.MM.YYYY') : null
	}
}
