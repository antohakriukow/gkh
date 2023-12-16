import ReportForm from './22gkh/ReportForm'
import { useReportEditor } from './useReportEditor'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { Button, Heading } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { convertPeriod } from '~/utils/report.utils'

import styles from './ReportEditor.module.scss'

const ReportEditor: FC = () => {
	const { register, setValue, control, formState, watch, handleSubmit } =
		useForm<IReport>({
			mode: 'onSubmit'
		})

	const {
		onSubmit,
		generateReport,
		downloadReportXML,
		downloadReportPDF,
		currentReport,
		closeReport
	} = useReportEditor(setValue)

	const isGenerated = !!currentReport?.finalReport

	const heading = currentReport
		? `Отчет 22-ЖКХ (Жилище) за ${convertPeriod(
				currentReport?.period
		  )} ${currentReport?.year}`
		: ''

	return (
		<div>
			<div className={styles.header}>
				<Heading title={heading} className={styles.title} />
				<AiOutlineCloseCircle onClick={closeReport} color='#df4956' size={32} />
			</div>
			<ReportForm
				register={register}
				control={control}
				formState={formState}
				watch={watch}
				setValue={setValue}
			/>
			<Button onClick={handleSubmit(onSubmit)} className={styles.button}>
				Сохранить
			</Button>
			<Button onClick={generateReport} className={styles.button}>
				Сгенерировать отчет
			</Button>
			{isGenerated && (
				<>
					<Button onClick={downloadReportPDF} className={styles.button}>
						Скачать PDF
					</Button>
					<Button onClick={downloadReportXML} className={styles.button}>
						Скачать XML
					</Button>
				</>
			)}
		</div>
	)
}

export default ReportEditor
