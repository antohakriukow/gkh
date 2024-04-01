import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useState
} from 'react'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import { IContext } from '../data-uploader.interface'

const DataUploaderContext = createContext<IContext | undefined>(undefined)

export const useDataUploaderContext = () => {
	const context = useContext(DataUploaderContext)
	if (context === undefined) {
		throw new Error(
			'useDataUploaderContext must be used within a DataUploaderProvider'
		)
	}
	return context
}

export const DataUploaderProvider: FC<PropsWithChildren<{}>> = ({
	children
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

	const [annualOperations, setAnnualOperations] = useState<
		IAccountingOperation[] | IBankOperation[]
	>([])
	const [annualAccounts, setAnnualAccounts] = useState<IAccount[]>([])
	const [annualFileNames, setAnnualFileNames] = useState<string[]>([])
	const [annualStartDate, setAnnualStartDate] = useState<string>('')
	const [annualFinalDate, setAnnualFinalDate] = useState<string>('')
	const [annualCompanyNames, setAnnualCompanyNames] = useState<string[]>([])
	const [annualError, setAnnualError] = useState<string>('')
	const [structure, setStructure] = useState<
		TypeAnnualReportStructure | undefined
	>(undefined)

	const value = {
		isLoading,
		step,
		annualOperations,
		annualAccounts,
		annualFileNames,
		annualStartDate,
		annualFinalDate,
		annualCompanyNames,
		annualError,
		structure,

		setIsLoading,
		setStep,
		setAnnualOperations,
		setAnnualAccounts,
		setAnnualFileNames,
		setAnnualStartDate,
		setAnnualFinalDate,
		setAnnualCompanyNames,
		setAnnualError,
		setStructure
	}

	return (
		<DataUploaderContext.Provider value={value}>
			{children}
		</DataUploaderContext.Provider>
	)
}
