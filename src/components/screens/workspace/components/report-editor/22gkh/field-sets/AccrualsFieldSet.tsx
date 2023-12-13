import { accrualsFieldsData } from './mocks/accruals.fields.mock'
import { FC, useCallback, useEffect, useState } from 'react'

import { IServices } from '~/shared/types/report22gkh.interface'

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

			return service ? service.status : false
		})
		setProvidedServices(result)
	}, [settingsServices])

	useEffect(() => {
		const interval = setInterval(() => {
			checkServices()
		}, 500)

		return () => clearInterval(interval)
	}) // TODO: Убрать костыль, сделать нормально

	return (
		<>
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

export default AccrualsFieldSet
