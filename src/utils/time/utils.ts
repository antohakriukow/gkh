import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import minMax from 'dayjs/plugin/minMax'
import utc from 'dayjs/plugin/utc'

dayjs.extend(minMax)
dayjs.extend(utc)
dayjs.extend(customParseFormat)

export const convertTimestampToDate = (timestamp: number): string =>
	dayjs.utc(timestamp).format('DD.MM.YYYY')

export const convertTimestampToDateWithTime = (timestamp: number): string =>
	dayjs.utc(timestamp).format('DD.MM.YYYY HH:mm')

export const GetDateIntervalBoundaries = (data: string[]) => {
	if (data.length === 0) {
		return { earliest: null, latest: null }
	}

	const dates = data
		.map(item => dayjs(item, 'DD.MM.YYYY HH:mm:ss'))
		.filter(date => date.isValid())

	const earliestDate = dates.length > 0 ? dayjs.min(dates) : null
	const latestDate = dates.length > 0 ? dayjs.max(dates) : null

	return {
		earliest: earliestDate ? earliestDate.format('DD.MM.YYYY') : null,
		latest: latestDate ? latestDate.format('DD.MM.YYYY') : null
	}
}
