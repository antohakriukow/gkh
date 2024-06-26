import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './field.module.scss'

interface IFieldGroup {
	isVisible: boolean
}

const FieldGroup: FC<PropsWithChildren<IFieldGroup>> = ({
	isVisible,
	children
}) => {
	return (
		<div className={cn({ [styles.fieldGroup]: isVisible })}>{children}</div>
	)
}
export default FieldGroup
