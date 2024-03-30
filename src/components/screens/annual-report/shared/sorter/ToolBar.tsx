import { IToolbarProps } from './sorter.interface'
import { FC } from 'react'
import { FaPlus } from 'react-icons/fa6'

import { Button } from '~/components/ui'

const ToolBar: FC<IToolbarProps> = ({ onSubmit, disabled }) => {
	return (
		<Button onClick={onSubmit} disabled={disabled}>
			<FaPlus />
		</Button>
	)
}
export default ToolBar
