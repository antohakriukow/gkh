import { IButton } from './form.interface'
import cn from 'classnames'
import { FC } from 'react'

import styles from './form.module.scss'

const Button: FC<IButton> = ({ children, className, color, ...props }) => {
	return (
		<button
			disabled={props.disabled}
			className={cn(className, styles.button, {
				[styles.success]: color === 'success',
				[styles.danger]: color === 'danger',
				[styles.disabled]: props.disabled
			})}
			{...props}
		>
			{children}
		</button>
	)
}
export default Button
