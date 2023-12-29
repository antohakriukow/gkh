import * as servicesFieldsData from './data/services.fields.data'
import { FC } from 'react'

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

	const renderConditions = {
		coldToHotWaterData: hasWaterHeating || hasGasBoiler,
		requiredData: true,
		heatData: hasNoWaterHeating && hasNoGasBoiler,
		heatToHotWaterData: hasWaterHeating,
		hotWaterData: hasNoWaterHeating && hasNoGasBoiler,
		gasData: true,
		requiredCommonData: true,
		coldToHotWaterCommonData: hasWaterHeating || hasGasBoiler,
		heatToHotWaterCommonData: hasWaterHeating,
		hotWaterCommonData: hasNoWaterHeating && hasNoGasBoiler
	}

	const fieldsToRender = Object.keys(renderConditions).reduce<IFieldsData[]>(
		(acc, key) => {
			if (renderConditions[key as keyof typeof renderConditions]) {
				const fields =
					servicesFieldsData[key as keyof typeof servicesFieldsData]
				if (fields) {
					return [...acc, ...fields]
				}
			}
			return acc
		},
		[]
	)

	return (
		<>
			<h3 className={styles.blockTitle}>
				Действующие услуги (Начисляет УО) {isAdvancedModeOn ? 'и площади' : ''}
			</h3>
			<div className={styles.fieldSet}>{renderFields(fieldsToRender)}</div>
		</>
	)
}

export default ServicesFieldSet
