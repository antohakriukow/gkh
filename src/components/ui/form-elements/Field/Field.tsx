import cn from 'classnames'
import { forwardRef } from 'react'

import { IField } from '../form.interface'

import styles from './Field.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', isNarrow, style, ...props }, ref) => {
		return (
			<div className={styles.container} style={style}>
				<div className={cn(styles.common, styles.field, styles.string)}>
					<label className={styles.stringLabel}>
						{!!placeholder && <span>{placeholder}</span>}
						<div
							className={cn(styles.inputContainer, {
								[styles.narrow]: isNarrow
							})}
						>
							<input ref={ref} type={type} {...props} />
						</div>
					</label>
				</div>
				{error && error.message && (
					<div className={styles.error}>{error.message}</div>
				)}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
