import { useAnnualReport } from '../../useAnnualReport'

export const useStepFour = () => {
	const { annualReportInDB } = useAnnualReport()

	return { annualReportInDB }
}
