import ReportDeleteModal from './report-delete-modal/ReportDeleteModal'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { Button } from '~/components/ui'
import SubHeader from '~/components/ui/sub-header/SubHeader'

interface IToolbarProps {
	title: string
	isDeleteButtonDisabled: boolean
	handleClose: () => void
	handleDelete: () => void
}

const Toolbar: FC<IToolbarProps> = ({
	title,
	isDeleteButtonDisabled,
	handleClose,
	handleDelete
}) => {
	const { showModal } = useModal()
	const handleShowDeleteModal = () => {
		showModal(<ReportDeleteModal handleDelete={handleDelete} title={title} />)
	}

	const DELETE = 'Удалить'
	const CLOSE = 'Закрыть'

	return (
		<SubHeader title={title}>
			{!isDeleteButtonDisabled && (
				<Button color='danger' onClick={handleShowDeleteModal}>
					{DELETE}
				</Button>
			)}
			<Button onClick={handleClose}>{CLOSE}</Button>
		</SubHeader>
	)
}
export default Toolbar
