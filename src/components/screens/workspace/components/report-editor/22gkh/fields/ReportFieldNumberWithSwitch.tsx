import { FC, useCallback, useEffect } from 'react'

import { Field } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportFieldNumberWithSwitch } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'

const ReportFieldNumberWithSwitch: FC<IReportFieldNumberWithSwitch> = ({
	register,
	watch,
	placeholder,
	fieldName,
	switcherName,
	setValue,
	error
}) => {
	const isAdvancedModeOn =
		watch('data.settings.housesCount') === 'many' &&
		watch('data.settings.housesAreSame') === 'no'

	const isChecked = watch(switcherName as keyof IReport)
	const monetizedArea =
		watch('data.area.residentialArea') + watch('data.area.nonResidentialArea')

	const handleSetDefaultArea = useCallback(
		() => setValue(fieldName as keyof IReport, monetizedArea),
		[setValue, fieldName, monetizedArea]
	)

	useEffect(() => {
		if (isChecked) handleSetDefaultArea()
	}, [isChecked, handleSetDefaultArea])

	return (
		<div
			className={
				isChecked && isAdvancedModeOn
					? styles.fieldWithCheckbox
					: styles.checkbox
			}
		>
			<Field
				{...register(switcherName as keyof IReport)}
				isString
				placeholder={placeholder}
				type='checkbox'
			/>
			{isChecked && isAdvancedModeOn && (
				<Field
					{...register(fieldName as keyof IReport, {
						valueAsNumber: true,
						required: 'Обязательное поле'
					})}
					error={error}
					isString
					type='number'
					autoComplete='off'
				/>
			)}
		</div>
	)
}
export default ReportFieldNumberWithSwitch
