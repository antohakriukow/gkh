import { FC } from 'react'

import { ICompany } from '~/shared/types/company.interface'

import styles from '../CashReport.module.scss'

const ReportHeader: FC<{ company: ICompany }> = ({ company }) => {
	return (
		<div className={styles.header}>
			<p></p>
			<h4>Отчет об исполнении сметы {company.name.short}</h4>
		</div>
	)
}
export default ReportHeader
