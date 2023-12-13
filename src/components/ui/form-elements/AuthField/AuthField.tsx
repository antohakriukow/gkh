import cn from 'classnames'
import { forwardRef } from 'react'

import { IField } from '../form.interface'

import styles from './AuthField.module.scss'

const AuthField = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...props }, ref) => {
		return (
			<div style={style}>
				<div className={cn(styles.common, styles.field)}>
					<label>
						{!!placeholder && <span>{placeholder}</span>}
						<div className={styles.inputContainer}>
							<input ref={ref} type={type} {...props} />
						</div>
					</label>
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

AuthField.displayName = 'AuthField'

export default AuthField
