import { IOption, ISelect } from './form.interface'
import { FC } from 'react'
import ReactSelect, { OnChangeValue, StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'

import styles from './form.module.scss'

const animatedComponents = makeAnimated()

const customStyles: StylesConfig<IOption, boolean> = {
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? '#93ecde' : provided.backgroundColor,
		color: '#171c36'
	}),
	container: provided => ({
		...provided,
		width: 164
	})
}

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading
}) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (!field.value) {
			return isMulti ? [] : ('' as any)
		}

		if (isMulti) {
			const valueArray = Array.isArray(field.value)
				? field.value
				: [field.value]
			return options.filter(option => valueArray.indexOf(option.value) >= 0)
		} else {
			return options.find(option => option.value === field.value)
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<div className={styles.inputContainer}>
					<ReactSelect
						classNamePrefix='custom-select'
						placeholder={''}
						options={options}
						value={getValue()}
						onChange={onChange}
						isMulti={isMulti}
						components={animatedComponents}
						isLoading={isLoading}
						styles={customStyles} // Добавление пользовательских стилей
					/>
					{error && <div className={styles.error}>{error.message}</div>}
				</div>
			</label>
		</div>
	)
}

export default Select
