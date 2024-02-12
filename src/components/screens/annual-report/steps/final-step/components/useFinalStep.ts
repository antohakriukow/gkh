import { useAnnualReport } from '../../../useAnnualReport'

export const useFinalStep = () => {
	const { annualReportInDB } = useAnnualReport()

	return { annualReportInDB }
}
