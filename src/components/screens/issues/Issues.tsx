import IssueItem from './IssueItem/IssueItem'
import IssueCreator from './IssueItem/components/IssueCreator'
import { FC } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useIssuesData } from '~/hooks'

import { Heading, Loader } from '~/components/ui'

import styles from './Issues.module.scss'

const Issues: FC = () => {
	const { issues, isLoading } = useIssuesData()
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/reports')
	}

	if (isLoading) return <Loader loaderType='small' />

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Heading title='Обращения' className={styles.title} />
				<div className={styles.tools}>
					<AiOutlineCloseSquare
						className={styles.close}
						onClick={handleGoBack}
						color='#e25a66'
						size={40}
					/>
				</div>
			</div>
			<div className={styles.issues}>
				<IssueCreator />
				{!!issues &&
					issues.map(issue => <IssueItem key={issue._id} issue={issue} />)}
			</div>
		</div>
	)
}
export default Issues
