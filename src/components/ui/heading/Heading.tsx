import cn from 'clsx'
import { FC } from 'react'

import styles from './Heading.module.scss'

interface IHeading {
	title: string
	className?: string
}

const Heading: FC<IHeading> = ({ title, className }) => {
	return <h1 className={cn(className, styles.headingDefault)}>{title}</h1>
}

export default Heading
