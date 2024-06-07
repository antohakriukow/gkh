import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useState
} from 'react'
import { useParams } from 'react-router-dom'
import { useSingleDebtData } from '~/hooks'

import { IDebtData, IDebtor } from '~/shared/types/debts'

import { IContext } from '../debt.interface'

const DebtContext = createContext<IContext | undefined>(undefined)

export const useDebtContext = () => {
	const context = useContext(DebtContext)
	if (context === undefined) {
		throw new Error('useDebtContext must be used within a DebtProvider')
	}
	return context
}

export const DebtProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { debtId } = useParams<{ debtId: string }>()
	const { debt: initialData, isLoading: isInitialDataLoading } =
		useSingleDebtData(debtId as string)

	const [isLoading, setIsLoading] = useState(isInitialDataLoading)
	const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
	const [house, setHouse] = useState(initialData?.address?.house ?? {})
	const [room, setRoom] = useState(initialData?.address?.room ?? '')
	const [debtor, setDebtor] = useState<IDebtor[]>(initialData?.debtor ?? [])
	const [main, setMain] = useState<IDebtData[]>(initialData.main ?? [])
	const [penalties, setPenalties] = useState<IDebtData[]>(
		initialData.penalties ?? []
	)
	const [duty, setDuty] = useState(initialData.duty ?? '')

	const value = {
		debtId,
		isLoading,
		step,
		house,
		room,
		debtor,
		main,
		penalties,
		duty,
		setIsLoading,
		setStep,
		setHouse,
		setRoom,
		setDebtor,
		setMain,
		setPenalties,
		setDuty
	}

	return <DebtContext.Provider value={value}>{children}</DebtContext.Provider>
}
