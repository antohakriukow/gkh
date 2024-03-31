import {
	accrualsFieldsData,
	renovationAccrualsData,
	requiredAccrualsFieldsData
} from './data/accruals.fields.data'
import { FC, useCallback, useEffect, useState } from 'react'

import { IServices } from '~/shared/types/report22gkh.interface'
import { IReport } from '~/shared/types/report.interface'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IAccrualsFieldSet extends IReportForm {}

interface IFieldData {
	name: string
	placeholder: string
	tooltip?: string
}

const AccrualsFieldSet: FC<IAccrualsFieldSet> = ({
	register,
	control,
	formState,
	setValue,
	watch
}) => {
	const [providedServices, setProvidedServices] = useState<IFieldData[]>([])
	const CURRENT_PERIOD_ACCRUALS = 'Начисления ЖКУ за отчетный период'

	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'
	const settingsServices = watch('data.settings.services')

	const checkServices = useCallback(() => {
		if (!settingsServices) return []
		const result = accrualsFieldsData.filter(field => {
			const serviceKey = field.name.split('.').pop() as keyof IServices
			const service = settingsServices[serviceKey]

			if (!service || !service.status) {
				setValue(field.name as keyof IReport, 0)
				return false
			}

			return true
		})
		setProvidedServices(result)
	}, [settingsServices, setValue])

	useEffect(() => {
		const interval = setInterval(() => {
			checkServices()
		}, 500)

		return () => clearInterval(interval)
	}) // TODO: Убрать костыль, сделать нормально. Возможно, вызов watch должен быть внутри useEffect

	return (
		<>
			<h3 className={styles.blockTitle}>{CURRENT_PERIOD_ACCRUALS}</h3>
			<div className={styles.fieldSet}>
				{providedServices.map(field => (
					<ReportFieldNumber
						key={field.name}
						control={control}
						fieldName={field.name}
						placeholder={field.placeholder}
						register={register}
						tooltip={field?.tooltip ? field?.tooltip : undefined}
					/>
				))}

				{requiredAccrualsFieldsData.map(field => (
					<ReportFieldNumber
						key={field.name}
						control={control}
						fieldName={field.name}
						placeholder={field.placeholder}
						register={register}
						tooltip={field?.tooltip ? field?.tooltip : undefined}
					/>
				))}

				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName={renovationAccrualsData.name}
						placeholder={renovationAccrualsData.placeholder}
						register={register}
						error={errors?.data?.accruals?.renovation}
						isRequired={isRenovationRequired}
					/>
				)}
			</div>
		</>
	)
}

export default AccrualsFieldSet
