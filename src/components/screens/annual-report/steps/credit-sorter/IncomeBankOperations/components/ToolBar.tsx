import { FC } from 'react'
import { FaPlus } from 'react-icons/fa6'

import { Button } from '~/components/ui'

import styles from './operations.module.scss'

interface IToolbar {
	onSubmit: () => void
	disabled: boolean
}

const ToolBar: FC<IToolbar> = ({ onSubmit, disabled }) => {
	return (
		<Button onClick={onSubmit} disabled={disabled}>
			<FaPlus />
		</Button>
	)
}
export default ToolBar
