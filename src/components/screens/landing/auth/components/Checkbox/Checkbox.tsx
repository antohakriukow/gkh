import { forwardRef } from 'react'

import { ICheckbox } from '../../auth.interface'

import styles from './Checkbox.module.scss'

const Checkbox = forwardRef<HTMLInputElement, ICheckbox>(
	({ placeholder, style, ...props }, ref) => {
		return (
			<div className={styles.container}>
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
