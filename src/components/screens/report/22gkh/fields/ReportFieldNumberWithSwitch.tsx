import { FC, useCallback, useEffect } from 'react'

import { Checkbox, Field } from '~/components/ui'

import { IReport } from '~/shared/types/report.interface'

import { IReportFieldWithSwitch } from '../../report-editor.interface'
import styles from '../ReportForm.module.scss'

const ReportFieldNumberWithSwitch: FC<IReportFieldWithSwitch> = ({
	register,
	watch,
	placeholder,
	fieldName,
	switcherName,
	setValue,
	showInput,
	error
}) => {
	const isChecked = watch(switcherName as keyof IReport)
	const monetizedArea = watch('data.area.residentialArea')
	//  + watch('data.area.nonResidentialArea')

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
				isChecked && showInput ? styles.fieldWithCheckbox : styles.checkbox
			}
		>
			<Checkbox
				{...register(switcherName as keyof IReport)}
				placeholder={
					isChecked && showInput ? `${placeholder}, м2` : placeholder
				}
			/>
			{isChecked && showInput && (
				<Field
					{...register(fieldName as keyof IReport, {
						valueAsNumber: true,
						required: 'Обязательное поле'
					})}
					error={error}
					type='number'
					autoComplete='off'
					isNarrow
				/>
			)}
		</div>
	)
}
export default ReportFieldNumberWithSwitch
