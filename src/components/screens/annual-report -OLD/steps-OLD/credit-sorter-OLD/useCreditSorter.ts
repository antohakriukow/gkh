import { useAuth } from '~/hooks/useAuth'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { TypeAnnualOperationTag } from '~/shared/types/annual.interface'

import { AnnualService } from '~/services/annual.service'

import { areArraysEqualByKey } from '~/utils/array.utils'

import { useAnnualReport } from '../../useAnnualReport-OLD'

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
		const bankOperationsInDB = annualReportInDB.data.bankOperations ?? []
		const notMainBankOperations = bankOperationsInDB.filter(
			op => op.direction !== 'main'
		)

		const resultArray = [...bankOperations, ...notMainBankOperations]
		if (areArraysEqualByKey(bankOperationsInDB, resultArray, '_id', 'tag')) {
			// console.log('EJECTED')
			return
		}
		try {
			// console.log('result: ', resultArray)
			AnnualService.updateBankOperations(
				user.uid,
				annualReportInDB._id.toString(),
				resultArray
			)
		} catch (error) {
			console.log('ERROR: ', error)
		}
	}

	return {
		annualReportInDB,
		isLoading,
		setBankOperationsTag,
		saveBankOperationsToDB
	}
}
