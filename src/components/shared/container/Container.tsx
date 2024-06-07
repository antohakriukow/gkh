import Toolbar from './components/Toolbar'
import { FC, PropsWithChildren } from 'react'

import { Button } from '~/components/ui'

import styles from './container.module.scss'

interface IContainerProps {
	title?: string
	onNext?: () => void
	onBack?: () => void
	NextButtonText?: string
	BackButtonText?: string
	nextButtonDisabled?: boolean
	backButtonDisabled?: boolean
	hasNoBackButton?: boolean
	hasNoNextButton?: boolean
	isDeleteButtonDisabled?: boolean
	handleClose: () => void
	handleDelete: () => void
}

const Container: FC<PropsWithChildren<IContainerProps>> = ({
	title = 'Отчет об исполнении сметы',
	children,
	onNext,
	onBack,
	NextButtonText = 'Далее',
	BackButtonText = 'Назад',
	nextButtonDisabled,
	backButtonDisabled,
	hasNoBackButton,
	hasNoNextButton,
	isDeleteButtonDisabled = false,
	handleClose,
	handleDelete
}) => {
	return (
		<div className={styles.container}>
			<Toolbar
				title={title}
				isDeleteButtonDisabled={isDeleteButtonDisabled}
				handleClose={handleClose}
				handleDelete={handleDelete}
			/>
			<div className={styles.children}>{children}</div>
			<div className={styles.buttons}>
				{hasNoBackButton ? (
					<div></div>
				) : (
					<Button disabled={backButtonDisabled} onClick={onBack}>
						{BackButtonText}
					</Button>
				)}
				{hasNoNextButton ? (
					<div></div>
				) : (
					<Button disabled={nextButtonDisabled} onClick={onNext}>
						{NextButtonText}
					</Button>
				)}
			</div>
		</div>
	)
}

export default Container
