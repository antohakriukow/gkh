import { accrualsFieldsData } from './mocks/accruals.fields.mock'
import { servicesFieldsData } from './mocks/services.fields.mock'
import { FC, useCallback, useEffect, useState } from 'react'

import { IServices } from '~/shared/types/report22gkh.interface'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'
import ReportFieldNumberWithSwitch from '../fields/ReportFieldNumberWithSwitch'

interface IServicesAndAccrualsFieldSet extends IReportForm {}

interface IFieldData {
	name: string
	placeholder: string
}

const ServicesAndAccrualsFieldSet: FC<IServicesAndAccrualsFieldSet> = ({
	register,
	control,
	watch,
	setValue,
	formState
}) => {
	const [providedServices, setProvidedServices] = useState<IFieldData[]>([])

	const isAdvancedModeOn =
		watch('data.settings.housesCount') === 'many' &&
		watch('data.settings.housesAreSame') === 'no'

	const errors = formState?.errors
	const isRenovationRequired = watch('data.renovation.status') !== 'no'
	const settingsServices = watch('data.settings.services')

	const checkServices = useCallback(() => {
		if (!settingsServices) return []
		const response = accrualsFieldsData.filter(field => {
			const serviceKey = field.name.split('.').pop() as keyof IServices
			const service = settingsServices[serviceKey]

			return service ? service.status : false
		})
		setProvidedServices(response)
	}, [settingsServices])

	useEffect(() => {
		checkServices()
	}, [settingsServices, checkServices])

	return (
		<>
			<h3 className={styles.blockTitle}>
				Действующие услуги {isAdvancedModeOn ? 'и площади' : ''}
			</h3>
			<div className={styles.fieldSet}>
				{servicesFieldsData.map(field => (
					<ReportFieldNumberWithSwitch
						key={field.name}
						control={control}
						fieldName={field.name}
						switcherName={field.switcherName}
						placeholder={field.placeholder}
						register={register}
						watch={watch}
						setValue={setValue}
					/>
				))}
			</div>
			<h3 className={styles.blockTitle}>Начисления ЖКУ с 01.01</h3>
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

export default ServicesAndAccrualsFieldSet
