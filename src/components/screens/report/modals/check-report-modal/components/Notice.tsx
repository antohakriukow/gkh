import { FC } from 'react'

import { ICheckReportResult } from '~/shared/types/report.interface'

import styles from '../CheckReportModal.module.scss'

interface INotice {
	errors: ICheckReportResult[]
	warnings: ICheckReportResult[]
}

const Notice: FC<INotice> = ({ errors, warnings }) => {
	return (
		<>
			{!!errors && errors.length && (
				<>
					<p className={styles.notice}>{`Внимание! Форма содержит ошибки${
						!!warnings &&
						warnings.length &&
						' и потенциальные ошибки (см. предупреждения)'
					}. Высока вероятность получения отрицательного протокола от Росстата.`}</p>
					<p className={styles.noticeWarning}>Продолжить генерацию отчета?</p>
				</>
			)}
			{!errors && !!warnings && warnings.length && (
				<p className={styles.notice}>
					Просим внимательно ознакомиться с предупреждениями перед генерацией
					отчета.
					<p className={styles.noticeWarning}>Продолжить генерацию отчета?</p>
				</p>
			)}
			{!errors && !warnings && (
				<p className={styles.notice}>
					Логических ошибок не обнаружено.
					<p className={styles.noticeWarning}>Продолжить генерацию отчета?</p>
				</p>
			)}
		</>
	)
}
export default Notice
