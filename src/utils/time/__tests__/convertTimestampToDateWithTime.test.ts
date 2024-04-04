import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { convertTimestampToDateWithTime } from '../utils'

dayjs.extend(utc)

describe('convertTimestampToDateWithTime', () => {
	it('with valid timestamp -> returns formatted date and time string', () => {
		const timestamp = 1577874600000 // 01.01.2020 10:30 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('01.01.2020 10:30')
	})

	it('with timestamp at start of epoch -> returns date and time for start of UNIX epoch', () => {
		const timestamp = 0 // 01.01.1970 00:00 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('01.01.1970 00:00')
	})

	it('with future timestamp -> returns correctly formatted future date and time', () => {
		const timestamp = 1916560800000 // 25.09.2030 10:00 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('25.09.2030 10:00')
	})

	it('with negative timestamp (before UNIX epoch) -> returns correctly formatted historical date and time', () => {
		const timestamp = -1800000 // 31.12.1969 23:30 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('31.12.1969 23:30')
	})

	it('at midnight -> returns time correctly formatted as 00:00', () => {
		const timestamp = 1577923200000 // 02.01.2020 00:00 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('02.01.2020 00:00')
	})

	it('at last minute of the day -> returns time correctly formatted as 23:59', () => {
		const timestamp = 1577923199000 // 01.01.2020 23:59 UTC
		const result = convertTimestampToDateWithTime(timestamp)
		expect(result).toEqual('01.01.2020 23:59')
	})
})
