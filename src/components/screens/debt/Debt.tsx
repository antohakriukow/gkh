import { FC } from 'react'
import { useParams } from 'react-router-dom'

const Debt: FC = () => {
	const { debtId } = useParams<{ debtId: string }>()
	return <div>DebtId: {debtId}</div>
}
export default Debt
