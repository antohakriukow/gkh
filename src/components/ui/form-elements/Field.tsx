import { IField } from './form.interface'
import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './form.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, isString, type = 'text', style, ...props }, ref) => {
		const isCheckbox = type === 'checkbox'
		return (
			<div className={cn({ [styles.container]: isString })} style={style}>
				<div
					className={cn(styles.common, styles.field, {
						[styles.string]: isString
					})}
				>
					<label className={cn({ [styles.stringLabel]: isString })}>
						{!!placeholder && <span>{placeholder}</span>}
						<div
							className={
								isCheckbox ? styles.checkboxContainer : styles.inputContainer
							}
						>
							{<input ref={ref} type={type} {...props} />}
						</div>
					</label>
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
