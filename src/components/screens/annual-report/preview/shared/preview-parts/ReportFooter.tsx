import { FC } from 'react'

import { ICompany } from '~/shared/types/company.interface'

import styles from './styles.module.scss'

const ReportFooter: FC<{ company: ICompany }> = ({ company }) => {
	return (
		<div className={styles.footer}>
			<div className={styles.signature}>
				<div>{company.leader_post}</div>
				<div></div>
				<div>{company.leader_name}</div>
			</div>
			<div className={styles.imprint}>М.П.</div>
			<div className={styles.date}>Дата составления: _________________</div>
		</div>
	)
}
export default ReportFooter
