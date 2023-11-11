import { FC } from 'react'

const AddBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <button onClick={onClick}>Добавить компанию</button>
}
export default AddBtn
