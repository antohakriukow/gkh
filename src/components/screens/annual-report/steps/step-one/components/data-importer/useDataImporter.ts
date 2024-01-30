import { useCallback } from 'react'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

import { parseTXTFile, parseXLSXFile } from '~/utils/annual.utils'

export const useDataImporter = () => {
	const state = useTypedSelector(state => state.annual)
	const {
		setAnnualOperations,
		setAnnualAccounts,
		setAnnualFileNames,
		setAnnualStartDate,
		setAnnualFinalDate,
		setAnnualError
	} = useActions()

	const handleFiles = useCallback(
		async (files: File[]) => {
			try {
				setAnnualFileNames(files.map(file => file.name))
				let allOperations: (IAccountingOperation | IBankOperation)[] = []
				let allAccounts: IAccount[] = []

				for (const file of files) {
					const fileExtension = file.name.split('.').pop()
					if (
						state.structure === 'accruals/services' &&
						fileExtension === 'xlsx'
					) {
						const { operations: xlsxOperations, accounts: xlsxAccounts } =
							await parseXLSXFile(file)
						allOperations.push(...xlsxOperations)
						allAccounts.push(...xlsxAccounts)
					} else if (
						(state.structure === 'cash/partners' ||
							state.structure === 'cash/services') &&
						fileExtension === 'txt'
					) {
						const { operations: txtOperations, accounts: txtAccounts } =
							await parseTXTFile(file)
						allOperations.push(...txtOperations)
						allAccounts.push(...txtAccounts)
					} else {
						setAnnualError(
							`Некорректный тип файла. Загрузите ${
								state.structure === 'accruals/services'
									? 'журнал проводок в формате XLSX'
									: 'банковские выписки в формате 1C'
							}`
						)
					}
				}

				if (!!allOperations) setAnnualStartDate(allOperations[0].date)
				if (!!allOperations)
					setAnnualFinalDate(allOperations[allOperations.length - 1].date)

				setAnnualOperations(
					allOperations as IAccountingOperation[] | IBankOperation[]
				)

				setAnnualAccounts(allAccounts)
			} catch (error) {
				console.error('Ошибка при обработке файлов:', error)
			}
		},
		[
			setAnnualOperations,
			setAnnualFileNames,
			setAnnualAccounts,
			setAnnualStartDate,
			setAnnualFinalDate
		]
	)

	const handleClick = () => {
		console.log('operations: ', state.operations)
		console.log('accounts: ', state.accounts)
	}

	return { state, handleFiles, handleClick }
}
