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
	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>Поступления за отчетный период</h3>
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
				{/* <ReportFieldNumber
					control={control}
					fieldName='data.income.commerce'
					placeholder='Поступления от деятельности, руб'
					register={register}
					error={errors?.data?.income?.commerce}
				/> */}
			</div>
		</>
	)
}

export default IncomeFieldSet
