import {
	gasServicesData,
	hasNotWaTerHeatingServicesFieldsData,
	hasNotWaterHeatingCommonServicesFieldsData,
	hasWaterHeatingCommonServicesFieldsData,
	hasWaterHeatingServicesFieldsData,
	heatingServicesData,
	requiredCommonServicesFieldsData,
	requiredServicesFieldsData
} from './data/services.fields.data'
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
	const waterHeatingStatus = watch('data.waterHeating.status')

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

	let fieldsToRender = [
		...requiredServicesFieldsData,
		...requiredCommonServicesFieldsData
	]

	if (hasNoGasBoiler) {
		fieldsToRender = [...fieldsToRender, ...heatingServicesData]
	}

	if (waterHeatingStatus === 'yes') {
		fieldsToRender = [
			...hasWaterHeatingServicesFieldsData,
			...fieldsToRender,
			...hasWaterHeatingCommonServicesFieldsData
		]
	} else if (waterHeatingStatus === 'no') {
		fieldsToRender = [
			...hasNotWaTerHeatingServicesFieldsData,
			...fieldsToRender,
			...hasNotWaterHeatingCommonServicesFieldsData
		]
	} else if (waterHeatingStatus === 'both') {
		fieldsToRender = [
			...hasWaterHeatingServicesFieldsData,
			...hasNotWaTerHeatingServicesFieldsData,
			...fieldsToRender,
			...hasWaterHeatingCommonServicesFieldsData,
			...hasNotWaterHeatingCommonServicesFieldsData
		]
	}

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
