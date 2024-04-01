import { FC } from 'react'

import { ICheckReportResult } from '~/shared/types/report.interface'

import styles from '../CheckReportModal.module.scss'

interface INotice {
	errors: ICheckReportResult[]
	warnings: ICheckReportResult[]
}

const Notice: FC<INotice> = ({ errors, warnings }) => {
	const NOTIFICATION = `Внимание! Форма содержит ошибки${
		!!warnings && warnings.length
			? ' и потенциальные ошибки (см. предупреждения)'
			: ''
	}. Высока вероятность получения отрицательного протокола от Росстата.`
	const CONTINUE_GENERATION = 'Продолжить генерацию отчета?'
	const PLEASE_READ_NOTIFICATIONS =
		'Просим внимательно ознакомиться с предупреждениями перед генерацией отчета.'
	const LOGIC_ERRORS_NOT_FOUND = 'Логических ошибок не обнаружено.'

	return (
		<>
			{errors.length > 0 && (
				<>
					<p className={styles.notice}>{NOTIFICATION}</p>
					<p className={styles.noticeWarning}>{CONTINUE_GENERATION}</p>
				</>
			)}
			{errors.length === 0 && warnings.length > 0 && (
				<>
					<p className={styles.notice}>{PLEASE_READ_NOTIFICATIONS}</p>
					<p className={styles.noticeWarning}>{CONTINUE_GENERATION}</p>
				</>
			)}
			{errors.length === 0 && warnings.length === 0 && (
				<>
					<p className={styles.notice}>{LOGIC_ERRORS_NOT_FOUND}</p>
					<p className={styles.noticeWarning}>{CONTINUE_GENERATION}</p>
				</>
			)}
		</>
	)
}
export default Notice
