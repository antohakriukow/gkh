import { FC, useEffect, useState } from 'react'
import ReactSelect, { OnChangeValue, StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'

import { IOption, ISelect } from '../form.interface'

import styles from './Select.module.scss'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading,
	isRequired,
	width
}) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const customStyles: StylesConfig<IOption, boolean> = {
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#c9cee8' : provided.backgroundColor,
			fontSize: windowWidth <= 450 ? '14px' : '16px',
			color: '#171c36'
		}),
		container: provided => ({
			...provided,
			width: width ? width : windowWidth <= 450 ? 140 : 164
		}),
		valueContainer: provided => ({
			...provided,
			fontSize: windowWidth <= 450 ? '14px' : '16px',
			lineHeight: 1,
			paddingTop: 0,
			paddingBottom: 0
		})
	}

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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
						styles={customStyles}
						required={isRequired}
					/>
					{error && <div className={styles.error}>{error.message}</div>}
				</div>
			</label>
		</div>
	)
}

export default Select
