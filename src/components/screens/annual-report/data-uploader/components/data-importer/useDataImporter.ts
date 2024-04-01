import { Dispatch, SetStateAction, useCallback } from 'react'
import { parseTXTFile } from '~/core/annual/parseTXTFile'
import { parseXLSXFile } from '~/core/annual/parseXLSXFile'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

export const useDataImporter = (
	structure: TypeAnnualReportStructure | undefined,

	setAnnualOperations: Dispatch<
		SetStateAction<IAccountingOperation[] | IBankOperation[]>
	>,
	setAnnualAccounts: Dispatch<SetStateAction<IAccount[]>>,
	setAnnualFileNames: Dispatch<SetStateAction<string[]>>,
	setAnnualStartDate: Dispatch<SetStateAction<string>>,
	setAnnualFinalDate: Dispatch<SetStateAction<string>>,
	setAnnualCompanyNames: Dispatch<SetStateAction<string[]>>,
	setAnnualError: Dispatch<SetStateAction<string>>
) => {
	const handleFiles = useCallback(
		async (files: File[]) => {
			try {
				setAnnualFileNames(files.map(file => file.name))
				let allOperations: (IAccountingOperation | IBankOperation)[] = []
				let allAccounts: IAccount[] = []
				let companyNames: string[] = []

				for (const file of files) {
					const fileExtension = file.name.split('.').pop()
					if (structure === 'accruals/services' && fileExtension === 'xlsx') {
						const { operations: xlsxOperations, accounts: xlsxAccounts } =
							await parseXLSXFile(file)
						allOperations.push(...xlsxOperations)
						xlsxAccounts.forEach(account => {
							if (!allAccounts.some(acc => acc.number === account.number)) {
								if (+account.number >= 80 && +account.number <= 89)
									allAccounts.push(account)
							}
						})
					} else if (
						(structure === 'cash/partners' || structure === 'cash/services') &&
						fileExtension === 'txt'
					) {
						const {
							operations: txtOperations,
							accounts: txtAccounts,
							companyName: txtCompanyName
						} = await parseTXTFile(file)
						allOperations.push(...txtOperations)
						txtAccounts.forEach(account => {
							if (!allAccounts.some(acc => acc.number === account.number)) {
								allAccounts.push(account)
							}
						})
						companyNames.push(txtCompanyName)
					} else {
						setAnnualError(
							`Некорректный тип файла. Загрузите ${
								structure === 'accruals/services'
									? 'журнал проводок в формате XLSX'
									: 'банковские выписки в формате 1C'
							}`
						)
					}
				}

				if (!!allOperations) setAnnualStartDate(allOperations[0]?.date ?? '')
				if (!!allOperations)
					setAnnualFinalDate(
						allOperations[allOperations.length - 1]?.date ?? ''
					)

				setAnnualOperations(
					allOperations as IAccountingOperation[] | IBankOperation[]
				)

				setAnnualAccounts(allAccounts)
				setAnnualCompanyNames(Array.from(new Set(companyNames)))
			} catch (error) {
				console.error('Ошибка при обработке файлов:', error)
			}
		},
		[
			setAnnualOperations,
			setAnnualFileNames,
			setAnnualAccounts,
			setAnnualStartDate,
			setAnnualFinalDate,
			setAnnualCompanyNames,
			setAnnualError,
			structure
		]
	)

	const onFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.files) {
				setAnnualError('')

				const newFiles = Array.from(event.target.files)
				handleFiles(newFiles)
			}
		},
		[handleFiles, setAnnualError]
	)

	const handleClickOnInput = () => {
		const hiddenInput = document.getElementById('hidden-file-input')
		if (hiddenInput) {
			hiddenInput.click()
		}
	}

	return { onFileChange, handleClickOnInput }
}
