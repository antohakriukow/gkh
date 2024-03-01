import cn from 'clsx'
import { FC } from 'react'

import styles from './Heading.module.scss'

interface ISubHeading {
	title: string
	className?: string
}

const SubHeading: FC<ISubHeading> = ({ title, className }) => {
	return <h2 className={cn(styles.subheading, className)}>{title}</h2>
}

export default SubHeading
