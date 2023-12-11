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
					placeholder='Поступило оплат за ЖКУ'
					register={register}
					error={errors?.data?.income?.housing}
					isRequired
				/>
				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.income.renovation'
						placeholder='Поступило оплат за капремонт'
						register={register}
						error={
							isRenovationRequired
								? errors?.data?.income?.renovation
								: undefined
						}
						isRequired={isRenovationRequired}
					/>
				)}
				<ReportFieldNumber
					control={control}
					fieldName='data.income.commerce'
					placeholder='Поступило доходов от коммерческой деятельности'
					register={register}
					error={errors?.data?.income?.commerce}
				/>
			</div>
		</>
	)
}

export default IncomeFieldSet
