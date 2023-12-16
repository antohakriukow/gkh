import { FC } from 'react'

import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReportForm } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'
import ReportFieldNumber from '../fields/ReportFieldNumber'

interface INaturalFieldSet extends IReportForm {}

const NaturalFieldSet: FC<INaturalFieldSet> = ({
	register,
	control,
	formState,
	watch
}) => {
	const { currentReport } = useTypedSelector(state => state.ui)

	if (currentReport?.period !== 4) return null

	const errors = formState?.errors
	const isElectricityRequired = watch('data.accruals.electricityCommon') > 0
	const isHeatRequired = watch('data.accruals.heat') > 0

	return (
		<>
			<h3 className={styles.blockTitle}>Натуральные показатели за год</h3>
			<div className={styles.fieldSet}>
				<ReportFieldNumber
					control={control}
					fieldName='data.natural.heat'
					placeholder='Начислено тепловой энергии, Гкал'
					register={register}
					error={errors?.data?.natural?.heat}
					isRequired={isHeatRequired}
				/>
				<ReportFieldNumber
					control={control}
					fieldName='data.natural.electricityCommon'
					placeholder='Начислено электроэнергии СОИ, кВт*ч'
					register={register}
					error={errors?.data?.natural?.electricityCommon}
					isRequired={isElectricityRequired}
				/>
			</div>
		</>
	)
}

export default NaturalFieldSet
