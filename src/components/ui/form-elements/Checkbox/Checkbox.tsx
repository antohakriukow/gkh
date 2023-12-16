import { forwardRef } from 'react'

import { IField } from '../form.interface'

import styles from './Checkbox.module.scss'

const Checkbox = forwardRef<HTMLInputElement, IField>(
	({ placeholder, style, ...props }, ref) => {
		return (
			<div className={styles.container}>
				{!!placeholder && (
					<span className={styles.placeholder}>{placeholder}</span>
				)}
				<label className={styles.checkbox}>
					<input ref={ref} type='checkbox' {...props} />
					<span className={styles.checkmark}></span>
				</label>
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
