import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui'

import styles from '../ReportEditor.module.scss'

const NoReportFound: FC = () => {
	const navigate = useNavigate()

	const handleClick = () => navigate('/reports')

	return (
		<div className={styles.container}>
			<div className={styles.notFound}>
				<p>Отчет не найден</p>
				<Button onClick={handleClick}>К отчетам</Button>
			</div>
		</div>
	)
}
export default NoReportFound
