import { useState } from 'react'

export const usePeriod = () => {
	const currentDate = new Date()
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth() // Месяцы начинаются с 0 (январь = 0, декабрь = 11)

	// Определение начального года и квартала
	let initialYear = currentYear
	let initialQuarter = Math.floor(currentMonth / 3) + 1
	if (initialQuarter === 1) {
		initialYear--
		initialQuarter = 4
	} else {
		initialQuarter--
	}

	const [reportYear, setReportYear] = useState(initialYear)
	const [reportPeriod, setReportPeriod] = useState(initialQuarter)

	const incrementYear = () => {
		setReportYear(prevYear =>
			prevYear < currentYear ? prevYear + 1 : prevYear
		)
	}

	const decrementYear = () => {
		setReportYear(prevYear => (prevYear > 2020 ? prevYear - 1 : prevYear))
	}

	const incrementPeriod = () => {
		setReportPeriod(prevQuarter => (prevQuarter === 4 ? 1 : prevQuarter + 1))
	}

	const decrementPeriod = () => {
		setReportPeriod(prevQuarter => (prevQuarter === 1 ? 4 : prevQuarter - 1))
	}

	return {
		reportYear,
		reportPeriod,
		incrementYear,
		decrementYear,
		incrementPeriod,
		decrementPeriod
	}
}
