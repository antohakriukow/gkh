import {
	advancedElevatorOptions,
	advancedRenovationOptions,
	advancedStoveOptions,
	advancedWaterHeatingOptions,
	areasAreDifferentOptions,
	budgetFinancingOptions,
	elevatorOptions,
	gasBoilerOptions,
	housesCountOptions,
	renovationCostsOptions,
	renovationOptions,
	stoveOptions,
	vatOptions,
	waterHeatingOptions
} from './data/parameters.select-options.data'
import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import FieldGroup from '../fields/FieldGroup'
import ReportFieldNumber from '../fields/ReportFieldNumber'
import ReportFieldText from '../fields/ReportFieldText'
import ReportSelect from '../fields/ReportSelect'

interface IParametersFieldSet extends IReportForm {}

const ParametersFieldSet: FC<IParametersFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const ORGANIZATION_PARAMETERS = 'Параметры Управляющей организации (УО)'

	const errors = formState?.errors
	const isElevatorBoth = watch('data.elevator.status') === 'both'
	const isStoveBoth = watch('data.stove.status') === 'both'
	const isRenovation = watch('data.renovation.status') !== 'no'
	const isRenovationBoth = watch('data.renovation.status') === 'both'
	const isBudgetFinancing = watch('data.budgetFinancing.status') === 'yes'
	const isRenovationCosts = watch('data.renovationCosts.status') === 'yes'
	const hasOneHouse = watch('data.settings.housesCount') === 'one'
	const hasManyHouses = watch('data.settings.housesCount') === 'many'
	const isAdvancedModeOn = hasManyHouses

	return (
		<>
			<h3 className={styles.blockTitle}>{ORGANIZATION_PARAMETERS}</h3>
			<div className={styles.fieldSet}>
				<ReportSelect
					control={control}
					fieldName='data.settings.housesCount'
					placeholder='Количество домов в управлении'
					options={housesCountOptions}
				/>
				{hasManyHouses && (
					<ReportSelect
						control={control}
						fieldName='data.settings.areasAreDifferent'
						placeholder='Разные площади для разных услуг'
						options={areasAreDifferentOptions}
						isRequired={!hasOneHouse}
					/>
				)}
				<ReportFieldNumber
					control={control}
					fieldName='data.area.residentialArea'
					placeholder='Площадь жилых помещений, м2'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data..area.nonResidentialArea'
					placeholder='Площадь нежилых помещений, м2'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.area.commonArea'
					placeholder='Площадь МОП, м2'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>

				<FieldGroup isVisible={isElevatorBoth}>
					<ReportSelect
						control={control}
						fieldName='data.elevator.status'
						placeholder='Наличие лифтов'
						options={
							isAdvancedModeOn ? advancedElevatorOptions : elevatorOptions
						}
					/>
					{isElevatorBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.elevator.areaWith'
							placeholder='Площадь домов с лифтами, м2'
							register={register}
							error={errors?.data?.elevator?.areaWith}
							isRequired={isElevatorBoth}
						/>
					)}
					{isElevatorBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.elevator.areaWithout'
							placeholder='Площадь домов без лифтов, м2'
							register={register}
							error={errors?.data?.elevator?.areaWithout}
							isRequired={isElevatorBoth}
						/>
					)}
				</FieldGroup>

				<FieldGroup isVisible={isStoveBoth}>
					<ReportSelect
						control={control}
						fieldName='data.stove.status'
						placeholder='Тип плит'
						options={isAdvancedModeOn ? advancedStoveOptions : stoveOptions}
					/>
					{isStoveBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.stove.areaElectro'
							placeholder='Площадь домов с электроплитами, м2'
							register={register}
							error={errors?.data?.stove?.areaElectro}
							isRequired={isStoveBoth}
						/>
					)}
					{isStoveBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.stove.areaGas'
							placeholder='Площадь домов с газовыми плитами, м2'
							register={register}
							error={errors?.data?.stove?.areaGas}
							isRequired={isStoveBoth}
						/>
					)}
				</FieldGroup>

				<ReportSelect
					control={control}
					fieldName='data.waterHeating.status'
					placeholder='УО осуществляет подогрев воды'
					options={
						isAdvancedModeOn ? advancedWaterHeatingOptions : waterHeatingOptions
					}
					isRequired
				/>

				<ReportSelect
					control={control}
					fieldName='data.gasBoiler.status'
					placeholder={
						isAdvancedModeOn
							? 'Есть дома с газовой котельной'
							: 'УО имеет газовую котельную'
					}
					options={gasBoilerOptions}
					isRequired
				/>

				<FieldGroup isVisible={isRenovationBoth}>
					<ReportSelect
						control={control}
						fieldName='data.renovation.status'
						placeholder='УО начисляет капремонт'
						options={
							isAdvancedModeOn ? advancedRenovationOptions : renovationOptions
						}
					/>
					{isRenovationBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.renovation.areaWith'
							placeholder='Площадь домов, которым УО начисляет капремонт, м2'
							register={register}
							error={errors?.data?.renovation?.areaWith}
							isRequired={isRenovationBoth}
						/>
					)}
					{isRenovationBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.renovation.areaWithout'
							placeholder='Площадь домов, которым УО не начисляет капремонт, м2'
							register={register}
							error={errors?.data?.renovation?.areaWithout}
							isRequired={isRenovationBoth}
						/>
					)}
				</FieldGroup>

				{isRenovation && (
					<FieldGroup isVisible={isRenovationCosts}>
						<ReportSelect
							control={control}
							fieldName='data.renovationCosts.status'
							placeholder='УО проводило капитальный ремонт с 01.01'
							options={renovationCostsOptions}
						/>
						{isRenovationCosts && (
							<ReportFieldNumber
								control={control}
								fieldName='data.renovationCosts.totalAmount'
								placeholder='Сумма затрат на капитальный ремонт с 01.01, руб'
								register={register}
								error={errors?.data?.renovationCosts?.totalAmount}
								isRequired={isRenovationCosts}
							/>
						)}
						{isRenovationCosts && (
							<ReportFieldNumber
								control={control}
								fieldName='data.renovationCosts.budgetTransfers'
								placeholder='В том числе трансферы из бюджета с 01.01, руб'
								register={register}
							/>
						)}
					</FieldGroup>
				)}

				<FieldGroup isVisible={isBudgetFinancing}>
					<ReportSelect
						control={control}
						fieldName='data.budgetFinancing.status'
						placeholder='УО получало бюджетное финансирование с 01.01'
						options={budgetFinancingOptions}
					/>
					{isBudgetFinancing && (
						<ReportFieldNumber
							control={control}
							fieldName='data.budgetFinancing.totalAmount'
							placeholder='Сумма трансферов из бюджета, руб'
							register={register}
							error={errors?.data?.budgetFinancing?.totalAmount}
							isRequired={isBudgetFinancing}
						/>
					)}
					{isBudgetFinancing && (
						<ReportFieldNumber
							control={control}
							fieldName='data.budgetFinancing.tariffCompensation'
							placeholder='В том числе компенсация разницы в тарифах, руб'
							register={register}
						/>
					)}
				</FieldGroup>

				<ReportSelect
					control={control}
					fieldName='data.vat.status'
					placeholder='УО - Плательщик НДС (ОСНО)'
					options={vatOptions}
					isRequired
				/>

				<ReportFieldText
					control={control}
					fieldName='company.email'
					placeholder='Email для указания в отчете'
					register={register}
					error={errors?.company?.email}
					isRequired
				/>
				<ReportFieldText
					control={control}
					fieldName='company.phone'
					placeholder='Телефон для указания в отчете'
					register={register}
					error={errors?.company?.phone}
					isRequired
				/>
			</div>
		</>
	)
}

export default ParametersFieldSet
