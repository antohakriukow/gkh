import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IIncomeFieldSet extends IReportForm {}

const IncomeFieldSet: FC<IIncomeFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const CURRENT_YEAR_RECEIVED = 'Поступления за отчетный период'

	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>{CURRENT_YEAR_RECEIVED}</h3>
			<div className={styles.fieldSet}>
				<ReportFieldNumber
					control={control}
					fieldName='data.income.housing'
					placeholder='Поступило на расчетные счета, руб'
					register={register}
					error={errors?.data?.income?.housing}
					isRequired
				/>
				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.income.renovation'
						placeholder='Поступило на специальные счета, руб'
						register={register}
						error={
							isRenovationRequired
								? errors?.data?.income?.renovation
								: undefined
						}
						isRequired={isRenovationRequired}
					/>
				)}
			</div>
		</>
	)
}

export default IncomeFieldSet
