import { useAuth } from '~/hooks/useAuth'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useDebitSorter = () => {
	const { user } = useAuth()
	const { annualReportInDB, isLoading } = useAnnualReport()

	const setBankOperationsCategory = (
		operationIds: string[],
		categoryId: string
	) => {
		if (!user || !annualReportInDB) return

		try {
			AnnualService.updateBankOperationCategories(
				user.uid,
				annualReportInDB?._id.toString(),
				categoryId,
				operationIds
			)
		} catch (error) {
			console.log(error)
		}
	}

	return { annualReportInDB, isLoading, setBankOperationsCategory }
}
