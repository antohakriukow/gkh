import * as servicesFieldsData from './data/services.fields.data'
import { FC, useEffect, useMemo, useState } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumberWithSwitch from '../fields/ReportFieldNumberWithSwitch'

interface IServicesFieldSet extends IReportForm {}

interface IFieldsData {
	switcherName: string
	name: string
	placeholder: string
}

const ServicesFieldSet: FC<IServicesFieldSet> = ({
	register,
	control,
	watch,
	setValue,
	formState
}) => {
	const [providedServices, setProvidedServices] = useState<IFieldsData[]>([])

	const isAdvancedModeOn =
		watch('data.settings.housesCount') === 'many' &&
		watch('data.settings.areasAreDifferent') === 'yes'

	const hasWaterHeating =
		watch('data.waterHeating.status') === 'yes' ||
		watch('data.waterHeating.status') === 'both'
	const hasNoWaterHeating = watch('data.waterHeating.status') === 'no'

	const hasGasBoiler =
		watch('data.gasBoiler.status') === 'yes' ||
		watch('data.gasBoiler.status') === 'both'
	const hasNoGasBoiler = watch('data.gasBoiler.status') === 'no'

	const renderFields = (fieldsData: IFieldsData[]) =>
		fieldsData.map(field => (
			<ReportFieldNumberWithSwitch
				key={field.name}
				control={control}
				fieldName={field.name}
				switcherName={field.switcherName}
				placeholder={field.placeholder}
				register={register}
				watch={watch}
				setValue={setValue}
				formState={formState}
				showInput={isAdvancedModeOn}
			/>
		))

	const renderConditions = useMemo(
		() => ({
			coldWater: true,
			coldToHotWater: hasWaterHeating || hasGasBoiler,
			hotWater: hasNoWaterHeating && hasNoGasBoiler,
			waterDisposal: true,
			heat: hasNoGasBoiler,
			heatToHotWater: hasWaterHeating && hasNoGasBoiler,
			solidWasteRemoval: true,
			electricity: true,
			gasNetwork: true,
			gasLiquid: true,
			coldWaterCommon: true,
			coldToHotWaterCommon: hasWaterHeating || hasGasBoiler,
			hotWaterCommon: hasNoWaterHeating && hasNoGasBoiler,
			waterDisposalCommon: true,
			heatToHotWaterCommon: hasWaterHeating && hasNoGasBoiler,
			electricityCommon: true
		}),
		[hasWaterHeating, hasNoWaterHeating, hasGasBoiler, hasNoGasBoiler]
	)

	useEffect(() => {
		const newFieldsToRender: IFieldsData[] = []
		Object.keys(renderConditions).forEach(key => {
			const condition = renderConditions[key as keyof typeof renderConditions]
			const field = servicesFieldsData[key as keyof typeof servicesFieldsData]

			if (condition) {
				if (field) {
					newFieldsToRender.push(field)
				}
			} else if (field) {
				setValue(field.switcherName as any, false)
			}
		})

		setProvidedServices(newFieldsToRender)
	}, [renderConditions, setValue])

	const CURRENT_SERVICES = `Действующие услуги (Начисляет УО) ${
		isAdvancedModeOn ? 'и площади' : ''
	}`

	return (
		<>
			<h3 className={styles.blockTitle}>{CURRENT_SERVICES}</h3>
			<div className={styles.fieldSet}>{renderFields(providedServices)}</div>
		</>
	)
}

export default ServicesFieldSet
