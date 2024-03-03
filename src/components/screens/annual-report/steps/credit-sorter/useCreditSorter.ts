import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { TypeAnnualOperationTag } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { useAnnualReport } from '../../useAnnualReport'

export const useCreditSorter = () => {
	const { user } = useAuth()
	const { bankOperations } = useTypedSelector(state => state.ui)

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

	const saveBankOperationsToDB = () => {
		if (!user || !annualReportInDB) return
		try {
			AnnualService.updateBankOperations(
				user.uid,
				annualReportInDB._id.toString(),
				bankOperations
			)
		} catch (error) {
			console.log('ERROR: ', error)
		}
		// console.log('useCreditSorter bankOperations: ', bankOperations)
	}

	return {
		annualReportInDB,
		isLoading,
		setBankOperationsTag,
		saveBankOperationsToDB
	}
}
