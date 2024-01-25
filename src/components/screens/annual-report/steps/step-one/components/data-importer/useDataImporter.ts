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
	const { accounts, operations, fileNames } = useTypedSelector(
		state => state.annual
	)
	const { setOperations, setAccounts, setFileNames } = useActions()

	const handleFiles = useCallback(
		async (files: File[]) => {
			try {
				setFileNames(files.map(file => file.name))
				let allOperations: (IAccountingOperation | IBankOperation)[] = []
				let allAccounts: IAccount[] = []

				for (const file of files) {
					const fileExtension = file.name.split('.').pop()
					switch (fileExtension) {
						case 'xlsx':
							const { operations: xlsxOperations, accounts: xlsxAccounts } =
								await parseXLSXFile(file)
							allOperations.push(...xlsxOperations)
							allAccounts.push(...xlsxAccounts)
							break
						case 'txt':
							const { operations: txtOperations, accounts: txtAccounts } =
								await parseTXTFile(file)
							allOperations.push(...txtOperations)
							allAccounts.push(...txtAccounts)
							break
						default:
							console.error('Unsupported file type:', fileExtension)
					}
				}

				setOperations(
					allOperations as IAccountingOperation[] | IBankOperation[]
				)
				// If you have a separate action for bank operations, use it here
				// setBankOperations(bankOperations);

				setAccounts(allAccounts)
			} catch (error) {
				console.error('Ошибка при обработке файлов:', error)
			}
		},
		[setOperations, setFileNames, setAccounts]
	)

	const handleClick = () => {
		// Получение текущих значений формы
		console.log('operations: ', operations)
		console.log('accounts: ', accounts)
	}

	return { handleFiles, handleClick, fileNames }
}
