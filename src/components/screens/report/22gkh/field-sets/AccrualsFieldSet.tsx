import { accrualsFieldsData } from './data/accruals.fields.data'
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
}

const AccrualsFieldSet: FC<IAccrualsFieldSet> = ({
	register,
	control,
	formState,
	setValue,
	watch
}) => {
	const [providedServices, setProvidedServices] = useState<IFieldData[]>([])

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
			<h3 className={styles.blockTitle}>Начисления ЖКУ за отчетный период</h3>
			<div className={styles.fieldSet}>
				{providedServices.map(field => (
					<ReportFieldNumber
						key={field.name}
						control={control}
						fieldName={field.name}
						placeholder={field.placeholder}
						register={register}
					/>
				))}
				<ReportFieldNumber
					control={control}
					fieldName='data.accruals.management'
					placeholder='Управление МКД, руб'
					register={register}
					error={errors?.data?.accruals?.management}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.accruals.maintenance'
					placeholder='Содержание и текущий ремонт ОИ, руб'
					register={register}
					error={errors?.data?.accruals?.maintenance}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.accruals.other'
					placeholder='Прочие услуги, руб'
					register={register}
					error={errors?.data?.accruals?.other}
					isRequired
				/>
				{isRenovationRequired && (
					<ReportFieldNumber
						control={control}
						fieldName='data.accruals.renovation'
						placeholder='Взносы на капремонт, руб'
						register={register}
						error={
							isRenovationRequired
								? errors?.data?.accruals?.renovation
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
