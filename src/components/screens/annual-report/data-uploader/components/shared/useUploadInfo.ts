import { IAccount } from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual/utils'

import { useDataUploaderContext } from '../../provider/provider'

export const useUploadInfo = () => {
	const {
		annualOperations,
		annualAccounts,
		annualFileNames,
		annualStartDate,
		annualFinalDate,
		annualCompanyNames,
		structure
	} = useDataUploaderContext()
	const uploadInfoData = [
		{
			title: 'Шаблон отчета',
			value: getAnnualReportStructureName(structure)
		},
		{ title: 'Загружено файлов', value: String(annualFileNames) },
		{
			title: 'Распознано компаний',
			value: String(
				`${annualCompanyNames.length} (${String(annualCompanyNames)})`
			)
		},
		{
			title: 'Распознано счетов',
			value: String(`${annualAccounts.length} (
						${String(
							annualAccounts.map(
								(acc: IAccount) => ` ***${acc.number.slice(-4)}`
							)
						)})`)
		},
		{
			title: 'Распознано операций',
			value: String(annualOperations.length)
		},
		{ title: 'Дата первой операции', value: String(annualStartDate) },
		{ title: 'Дата последней операции', value: String(annualFinalDate) }
	]

	return uploadInfoData
}
