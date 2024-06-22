import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { TypeMonth, TypeYear } from '~/shared/types/period.interface'

dayjs.extend(customParseFormat)

export const incrementMonth = (month: TypeMonth): TypeMonth =>
	month === 12 ? 1 : ((month + 1) as TypeMonth)

export const incrementYear = (month: TypeMonth, year: TypeYear): TypeYear =>
	month === 12 ? ((year + 1) as TypeYear) : year

export const incrementDate = (date: string): string => {
	const [day, month, year] = date.split('.').map(Number)
	const newMonth = incrementMonth(month as TypeMonth)
	const newYear = incrementYear(month as TypeMonth, year as TypeYear)
	return `${day.toString().padStart(2, '0')}.${newMonth
		.toString()
		.padStart(2, '0')}.${newYear}`
}

export const getStringDate = (date: Date) => dayjs(date).format('DD.MM.YYYY')
export const getDayJSObjectFromString = (date: string) =>
	dayjs(date, 'DD.MM.YYYY')

export const getPreviousDay = (date: string) =>
	dayjs(date, 'DD.MM.YYYY').subtract(1, 'day').format('DD.MM.YYYY')

export const getMonthName = (month: TypeMonth): string => {
	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	]

	return monthNames[month - 1]
}
