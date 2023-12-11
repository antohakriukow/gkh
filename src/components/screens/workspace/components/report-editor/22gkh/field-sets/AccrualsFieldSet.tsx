import { accrualsFieldsData } from './mocks/accruals.fields.mock'
import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IAccrualsFieldSet extends IReportForm {}

const AccrualsFieldSet: FC<IAccrualsFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>Начисления ЖКУ с 01.01</h3>
			<div className={styles.fieldSet}>
				{accrualsFieldsData.map(field => (
					<ReportFieldNumber
						key={field.name}
						control={control}
						fieldName={field.name}
						placeholder={field.placeholder}
						register={register}
					/>
				))}
				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.accruals.renovation'
						placeholder='Взносы на капремонт'
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

export default AccrualsFieldSet
