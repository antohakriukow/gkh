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

	const INCLUDING_VAT = 'В том числе НДС в начислениях ЖКУ за отчетный период'

	const hasVat = watch('data.vat.status') === 'yes'
	const settingsServices = watch('data.settings.services')

	const checkServices = useCallback(() => {
		if (!settingsServices) return []

		const services = {
			...settingsServices,
			management: { status: true },
			maintenance: { status: true }
		}

		const vatValues = watch('data.vat.values')

		const result = vatFieldsData.filter(field => {
			const serviceKey = field.name.split('.').pop() as keyof IServices
			const service = services[serviceKey]

			const vatValue = vatValues ? vatValues[serviceKey] : null

			if (!service || !service.status || !hasVat || vatValue === null) {
				setValue(field.name as keyof IReport, 0)
				return false
			}

			return true
		})

		setProvidedServices(result)
	}, [settingsServices, setValue, watch, hasVat])

	useEffect(() => {
		const interval = setInterval(() => {
			checkServices()
		}, 500)

		return () => clearInterval(interval)
	})

	if (!hasVat) return null

	return (
		<>
			<h3 className={styles.blockTitle}>{INCLUDING_VAT}</h3>
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
			</div>
		</>
	)
}

export default VatFieldSet
