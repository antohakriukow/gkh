import { useAnnualReport } from '../../useAnnualReport'

export const useStepThree = () => {
	const { annualReportInDB } = useAnnualReport()

	return { annualReportInDB }
}
