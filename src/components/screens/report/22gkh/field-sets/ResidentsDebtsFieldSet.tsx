import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IResidentsDebtsFieldSet extends IReportForm {}

const ResidentsDebtsFieldSet: FC<IResidentsDebtsFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>
				Долги собственников перед УО на начало отчетного периода
			</h3>
			<div className={styles.fieldSet}>
				<ReportFieldNumber
					control={control}
					fieldName='data.residentsDebts.housing'
					placeholder='Долг собственников за ЖКУ, руб'
					register={register}
					error={errors?.data?.residentsDebts?.housing}
					isRequired
				/>
				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.residentsDebts.renovation'
						placeholder='Долг собственников за капремонт, руб'
						register={register}
						error={
							isRenovationRequired
								? errors?.data?.residentsDebts?.renovation
								: undefined
						}
						isRequired={isRenovationRequired}
					/>
				)}
			</div>
		</>
	)
}

export default ResidentsDebtsFieldSet
