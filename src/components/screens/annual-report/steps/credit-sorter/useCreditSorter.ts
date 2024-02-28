import { useAuth } from '~/hooks/useAuth'

import { TypeAnnualOperationTag } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useCreditSorter = () => {
	const { user } = useAuth()
	const { annualReportInDB, isLoading } = useAnnualReport()

	const setBankOperationsTag = (
		operationIds: string[],
		tag: TypeAnnualOperationTag
	) => {
		if (!user || !annualReportInDB) return

		try {
			AnnualService.updateBankOperationTags(
				user.uid,
				annualReportInDB?._id.toString(),
				tag,
				operationIds
			)
		} catch (error) {
			console.log(error)
		}
	}

	return { annualReportInDB, isLoading, setBankOperationsTag }
}
