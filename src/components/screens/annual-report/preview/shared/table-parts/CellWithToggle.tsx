import { FC } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

interface ICellWithToggleProps {
	isActive: boolean
	toggleActive: () => void
}

const CellWithToggle: FC<ICellWithToggleProps> = ({
	isActive,
	toggleActive
}) => {
	return <div onClick={toggleActive}>{isActive ? <FaMinus /> : <FaPlus />}</div>
}
export default CellWithToggle
