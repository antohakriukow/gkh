import { vatFieldsData } from './data/vat.fields.data'
import { FC, useCallback, useEffect, useState } from 'react'

import { IServices } from '~/shared/types/report22gkh.interface'
import { IReport } from '~/shared/types/report.interface'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface IVatFieldSet extends IReportForm {}

interface IFieldData {
	name: string
	placeholder: string
}

const VatFieldSet: FC<IVatFieldSet> = ({
	register,
	control,
	formState,
	setValue,
	watch
}) => {
	const [providedServices, setProvidedServices] = useState<IFieldData[]>([])

	const hasVat = watch('data.vat.status') === 'yes'
	const settingsServices = watch('data.settings.services')

	const checkServices = useCallback(() => {
		if (!settingsServices) return []
		const result = vatFieldsData.filter(field => {
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

	if (!hasVat) return null

	return (
		<>
			<h3 className={styles.blockTitle}>
				В том числе НДС в начислениях ЖКУ с 01.01
			</h3>
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
					key='data.vat.values.management'
					control={control}
					fieldName='data.vat.values.management'
					placeholder='Управление МКД, руб'
					register={register}
				/>
				<ReportFieldNumber
					key='data.vat.values.maintenance'
					control={control}
					fieldName='data.vat.values.maintenance'
					placeholder='Содержание и текущий ремонт ОИ (НДС), руб'
					register={register}
				/>
			</div>
		</>
	)
}

export default VatFieldSet
