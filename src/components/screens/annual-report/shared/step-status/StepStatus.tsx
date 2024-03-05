import cn from 'clsx'
import { FC, Fragment, PropsWithChildren } from 'react'

import { Button } from '~/components/ui'

import styles from './step-status.module.scss'

interface IStepDoneProps {
	title: string
	isDone?: boolean
	onClick?: () => void
	color?: string
}

const StepStatus: FC<PropsWithChildren<IStepDoneProps>> = ({
	children,
	title,
	isDone,
	onClick,
	color
}) => (
	<Fragment>
		<div
			className={cn(styles.container, {
				[styles.isDone]: isDone
			})}
			style={{ backgroundColor: color }}
		>
			<div>
				<p>{title}</p>
				{isDone && <p>: Завершено</p>}
			</div>
			{isDone && onClick && <Button onClick={onClick}>Вернуться</Button>}
		</div>
		{children}
	</Fragment>
)

export default StepStatus
