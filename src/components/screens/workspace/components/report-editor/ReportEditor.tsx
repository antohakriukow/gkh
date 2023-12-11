import ReportForm from './22gkh/ReportForm'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Heading } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { convertPeriod } from '~/utils/report.utils'

import styles from './ReportEditor.module.scss'

const ReportEditor: FC = () => {
	const { register, setValue, control, formState, watch, handleSubmit } =
		useForm<IReport>({
			mode: 'onSubmit'
		})

	const { onSubmit, generateReport, downloadReportXML, currentReport } =
		useReportEditor(setValue)

	const heading = currentReport
		? `Отчет 22-ЖКХ (Жилище) за ${convertPeriod(
				currentReport?.period
		  )} ${currentReport?.year}`
		: ''

	return (
		<div>
			<Heading title={heading} className={styles.reportTitle} />
			<ReportForm
				register={register}
				control={control}
				formState={formState}
				watch={watch}
			/>
			<Button onClick={handleSubmit(onSubmit)} className={styles.reportBtn}>
				Сохранить
			</Button>
			<Button onClick={generateReport} className={styles.reportBtn}>
				Сгенерировать отчет
			</Button>
			<Button onClick={downloadReportXML} className={styles.reportBtn}>
				Скачать XML
			</Button>
		</div>
	)
}

export default ReportEditor
