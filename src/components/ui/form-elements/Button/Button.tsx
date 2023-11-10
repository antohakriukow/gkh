import cn from 'classnames'
import { FC } from 'react'

import { IButton } from '../form.interface'

import styles from './Button.module.scss'

const Button: FC<IButton> = ({ children, className, ...props }) => {
	return (
		<button className={cn(styles.button, className)} {...props}>
			{children}
		</button>
	)
}
export default Button
