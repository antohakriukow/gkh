import { useEffect, useState } from 'react'

import { ICheckReportResult } from '~/shared/types/report.interface'

export const useCheckReportModal = (
	checkReport: () => Promise<ICheckReportResult[] | undefined>
) => {
	const [checkResults, setCheckResults] = useState<ICheckReportResult[] | null>(
		null
	)

	const warnings = checkResults
		? checkResults.filter(result => result.type === 'warning')
		: []
	const errors = checkResults
		? checkResults.filter(result => result.type === 'error')
		: []

	const isDanger = !!errors.length || (!!warnings && warnings.length > 3)

	useEffect(() => {
		checkReport().then(data => setCheckResults(data ?? []))
	}, [checkReport])

	return { checkResults, errors, warnings, isDanger }
}
