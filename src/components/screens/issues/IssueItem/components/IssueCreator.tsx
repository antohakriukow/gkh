import { FC } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { useModal } from '~/hooks/useModal'

import CreateIssueModal from '../../modals/create-issue-modal/CreateIssueModal'
import styles from '../IssueItem.module.scss'

const IssueCreator: FC = () => {
	const { showModal } = useModal()

	const handleClick = () => {
		showModal(<CreateIssueModal />)
	}

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.adder}>
				<AiOutlinePlus size={100} color='#8c8c8c' />
			</div>
		</div>
	)
}
export default IssueCreator
