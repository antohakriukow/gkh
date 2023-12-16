import {
	advancedElevatorOptions,
	advancedGasOptions,
	advancedRenovationOptions,
	advancedStoveOptions,
	budgetFinancingOptions,
	elevatorOptions,
	gasOptions,
	housesAreSameOptions,
	housesCountOptions,
	renovationCostsOptions,
	renovationOptions,
	stoveOptions
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
	const errors = formState?.errors
	const isElevatorBoth = watch('data.elevator.status') === 'both'
	const isStoveBoth = watch('data.stove.status') === 'both'
	const isGasBoth = watch('data.gas.status') === 'both'
	const isRenovation = watch('data.renovation.status') !== 'no'
	const isRenovationBoth = watch('data.renovation.status') === 'both'
	const isBudgetFinancing = watch('data.budgetFinancing.status') === 'yes'
	const isRenovationCosts = watch('data.renovationCosts.status') === 'yes'
	const hasOneHouse = watch('data.settings.housesCount') === 'one'
	const isAdvancedModeOn =
		watch('data.settings.housesCount') === 'many' &&
		watch('data.settings.housesAreSame') === 'no'

	return (
		<>
			<h3 className={styles.blockTitle}>
				Параметры Управляющей организации (УО)
			</h3>
			<div className={styles.fieldSet}>
				<ReportSelect
					control={control}
					fieldName='data.settings.housesCount'
					placeholder='Количество домов в управлении'
					options={housesCountOptions}
				/>
				{!hasOneHouse && (
					<ReportSelect
						control={control}
						fieldName='data.settings.housesAreSame'
						placeholder='Единая методика начисления для всех домов'
						options={housesAreSameOptions}
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

				<FieldGroup isVisible={isGasBoth}>
					<ReportSelect
						control={control}
						fieldName='data.gas.status'
						placeholder='УО начисляет плату за газ'
						options={isAdvancedModeOn ? advancedGasOptions : gasOptions}
					/>
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaNone'
							placeholder='Площадь домов без газа, м2'
							register={register}
							error={errors?.data?.gas?.areaNone}
							isRequired={isGasBoth}
						/>
					)}
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaNetwork'
							placeholder='Площадь домов с сетевым газом, м2'
							register={register}
							error={errors?.data?.gas?.areaNetwork}
							isRequired={isGasBoth}
						/>
					)}
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaLiquid'
							placeholder='Площадь домов со сжиженным газом, м2'
							register={register}
							error={errors?.data?.gas?.areaLiquid}
							isRequired={isGasBoth}
						/>
					)}
				</FieldGroup>

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
								placeholder='Сумма затрат на капитальный ремонт, руб'
								register={register}
								error={errors?.data?.renovationCosts?.totalAmount}
								isRequired={isRenovationCosts}
							/>
						)}
						{isRenovationCosts && (
							<ReportFieldNumber
								control={control}
								fieldName='data.renovationCosts.budgetTransfers'
								placeholder='В том числе трансферы из бюджета, руб'
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
