import {
	budgetFinancingOptions,
	elevatorOptions,
	gasOptions,
	hasOneHouseOptions,
	housesAreSameOptions,
	renovationCostsOptions,
	renovationOptions,
	stoveOptions
} from './mocks/parameters.select-options.mock'
import { FC } from 'react'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import FieldGroup from '../fields/FieldGroup'
import ReportFieldNumber from '../fields/ReportFieldNumber'
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
	const isSimpleModeOn =
		watch('data.settings.hasOneHouse') || watch('data.settings.housesAreSame')

	return (
		<>
			<h3 className={styles.blockTitle}>
				Параметры Управляющей организации (УО)
			</h3>
			<div className={styles.fieldSet}>
				<ReportSelect
					control={control}
					fieldName='data.settings.hasOneHouse'
					placeholder='Количество домов в управлении'
					options={hasOneHouseOptions}
				/>
				<ReportSelect
					control={control}
					fieldName='data.settings.housesAreSame'
					placeholder='Количество домов в управлении'
					options={housesAreSameOptions}
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.area.residentialArea'
					placeholder='Площадь жилых помещений'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data..area.nonResidentialArea'
					placeholder='Площадь нежилых помещений'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.area.commonArea'
					placeholder='Площадь МОП'
					register={register}
					error={errors?.data?.area?.residentialArea}
					isRequired
				/>

				<FieldGroup isVisible={isElevatorBoth}>
					<ReportSelect
						control={control}
						fieldName='data.elevator.status'
						placeholder='Наличие лифтов'
						options={elevatorOptions}
					/>
					{isElevatorBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.elevator.areaWith'
							placeholder='Площадь домов с лифтами'
							register={register}
							error={errors?.data?.elevator?.areaWith}
							isRequired={isElevatorBoth}
						/>
					)}
					{isElevatorBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.elevator.areaWithout'
							placeholder='Площадь домов без лифтов'
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
						options={stoveOptions}
					/>
					{isStoveBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.stove.areaElectro'
							placeholder='Площадь домов с электроплитами'
							register={register}
							error={errors?.data?.stove?.areaElectro}
							isRequired={isStoveBoth}
						/>
					)}
					{isStoveBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.stove.areaGas'
							placeholder='Площадь домов с газовыми плитами'
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
						options={gasOptions}
					/>
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaNone'
							placeholder='Площадь домов без газа'
							register={register}
							error={errors?.data?.gas?.areaNone}
							isRequired={isGasBoth}
						/>
					)}
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaNetwork'
							placeholder='Площадь домов с сетевым газом'
							register={register}
							error={errors?.data?.gas?.areaNetwork}
							isRequired={isGasBoth}
						/>
					)}
					{isGasBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.gas.areaLiquid'
							placeholder='Площадь домов со сжиженным газом'
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
						options={renovationOptions}
					/>
					{isRenovationBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.renovation.areaWith'
							placeholder='Площадь домов, которым УО начисляет капремонт'
							register={register}
							error={errors?.data?.renovation?.areaWith}
							isRequired={isRenovationBoth}
						/>
					)}
					{isRenovationBoth && (
						<ReportFieldNumber
							control={control}
							fieldName='data.renovation.areaWithout'
							placeholder='Площадь домов, которым УО не начисляет капремонт'
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
								placeholder='Сумма затрат на капитальный ремонт'
								register={register}
								error={errors?.data?.renovationCosts?.totalAmount}
								isRequired={isRenovationCosts}
							/>
						)}
						{isRenovationCosts && (
							<ReportFieldNumber
								control={control}
								fieldName='data.renovationCosts.budgetTransfers'
								placeholder='В том числе трансферы из бюджета'
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
							placeholder='Сумма трансферов из бюджета'
							register={register}
							error={errors?.data?.budgetFinancing?.totalAmount}
							isRequired={isBudgetFinancing}
						/>
					)}
					{isBudgetFinancing && (
						<ReportFieldNumber
							control={control}
							fieldName='data.budgetFinancing.tariffCompensation'
							placeholder='В том числе компенсация разницы в тарифах'
							register={register}
						/>
					)}
				</FieldGroup>
			</div>
		</>
	)
}

export default ParametersFieldSet
