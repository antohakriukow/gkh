import { useAuth } from '~/hooks/useAuth'

import { TypeAnnualOperationTag } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useStepThree = () => {
	const { user } = useAuth()
	const { annualReportInDB, isLoading } = useAnnualReport()

	const setBankOperationsTag = (
		operationIds: string[],
		tag: TypeAnnualOperationTag
	) => {
		if (!user || !annualReportInDB) return

		try {
			operationIds.forEach(operationId =>
				AnnualService.updateBankOperationTag(
					user.uid,
					annualReportInDB?._id.toString(),
					tag,
					operationId
				)
			)
		} catch (error) {
			console.log(error)
		}
	}

	return { annualReportInDB, isLoading, setBankOperationsTag }
}
