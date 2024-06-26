import { getDayJSObjectFromString } from '~/utils/period.utils'

export const getDaysCount = (dateStart: string, dateEnd: string) => {
	const start = getDayJSObjectFromString(dateStart)
	const end = getDayJSObjectFromString(dateEnd)

	const daysCount = +end.diff(start, 'day').toFixed(2) + 1

	return daysCount
}
