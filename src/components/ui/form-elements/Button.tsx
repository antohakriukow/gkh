import { IButton } from './form.interface'
import cn from 'classnames'
import { FC } from 'react'

import styles from './form.module.scss'

const Button: FC<IButton> = ({ children, className, color, ...props }) => {
	return (
		<button
			className={cn(
				styles.button,
				{
					[styles.success]: color === 'success',
					[styles.danger]: color === 'danger'
				},
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
export default Button
