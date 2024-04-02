import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { convertTimestampToDate } from '../utils'

dayjs.extend(customParseFormat)

describe('convertTimestampToDate', () => {
	it('with valid timestamp -> returns formatted date string', () => {
		// Timestamp for '01.01.2020'
		const timestamp = 1577836800000
		const result = convertTimestampToDate(timestamp)
		expect(result).toEqual('01.01.2020')
	})

	it('with timestamp at start of epoch -> returns date for start of UNIX epoch', () => {
		// Timestamp for '01.01.1970'
		const timestamp = 0
		const result = convertTimestampToDate(timestamp)
		expect(result).toEqual('01.01.1970')
	})

	it('with future timestamp -> returns correctly formatted future date', () => {
		// Future timestamp for '01.01.2030'
		const timestamp = 1893456000000
		const result = convertTimestampToDate(timestamp)
		expect(result).toEqual('01.01.2030')
	})

	it('with negative timestamp (before UNIX epoch) -> returns correctly formatted historical date', () => {
		// Timestamp for '31.12.1969'
		const timestamp = -86400000
		const result = convertTimestampToDate(timestamp)
		expect(result).toEqual('31.12.1969')
	})
})
