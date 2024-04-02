import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import minMax from 'dayjs/plugin/minMax'

import { GetDateIntervalBoundaries } from '../utils'

dayjs.extend(customParseFormat)
dayjs.extend(minMax)

describe('GetDateIntervalBoundaries', () => {
	it('with empty array -> returns null for both earliest and latest dates', () => {
		const result = GetDateIntervalBoundaries([])
		expect(result).toEqual({ earliest: null, latest: null })
	})

	it('with array of valid date strings -> returns correct earliest and latest dates', () => {
		const dates = [
			'01.01.2020 12:00:00',
			'15.03.2020 12:00:00',
			'31.12.2019 12:00:00'
		]
		const result = GetDateIntervalBoundaries(dates)
		expect(result).toEqual({ earliest: '31.12.2019', latest: '15.03.2020' })
	})

	it('with array containing a single date -> returns that date as both earliest and latest', () => {
		const dates = ['10.10.2020 10:00:00']
		const result = GetDateIntervalBoundaries(dates)
		expect(result).toEqual({ earliest: '10.10.2020', latest: '10.10.2020' })
	})

	it('with array of invalid date formats -> gracefully handles by returning null for both earliest and latest', () => {
		const dates = ['invalid date', 'another invalid date']
		const result = GetDateIntervalBoundaries(dates)
		expect(result).toEqual({ earliest: null, latest: null })
	})
})
