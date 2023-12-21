import { forwardRef } from 'react'

import { IField } from '../form.interface'

import styles from './AuthField.module.scss'

const AuthField = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...props }, ref) => {
		return (
			<div style={style}>
				<input
					className={styles.input}
					placeholder={placeholder}
					ref={ref}
					type={type}
					{...props}
				/>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

AuthField.displayName = 'AuthField'

export default AuthField
