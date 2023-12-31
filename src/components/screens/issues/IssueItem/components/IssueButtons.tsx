import { FC } from 'react'

import { Button } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import IssueModal from '../../modals/issue-modal/IssueModal'
import styles from '../IssueItem.module.scss'
import { IIssueItem } from '../issue-item.interface'

const IssueButtons: FC<IIssueItem> = ({ issue }) => {
	const { showModal } = useModal()

	const handleClick = () => {
		showModal(<IssueModal issue={issue} />)
	}

	return (
		<Button className={styles.button} onClick={handleClick}>
			Подробнее
		</Button>
	)
}
export default IssueButtons
