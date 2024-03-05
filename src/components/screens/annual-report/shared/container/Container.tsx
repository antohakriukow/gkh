import { FC, PropsWithChildren } from 'react'

import { Button } from '~/components/ui'

import styles from './container.module.scss'

interface IContainerProps {
	onNext?: () => void
	onBack?: () => void
	NextButtonText?: string
	BackButtonText?: string
	nextButtonDisabled?: boolean
	backButtonDisabled?: boolean
	hasNoBackButton?: boolean
	hasNoNextButton?: boolean
}

const Container: FC<PropsWithChildren<IContainerProps>> = ({
	children,
	onNext,
	onBack,
	NextButtonText = 'Далее',
	BackButtonText = 'Назад',
	nextButtonDisabled,
	backButtonDisabled,
	hasNoBackButton,
	hasNoNextButton
}) => {
	return (
		<div className={styles.container}>
			<div>{children}</div>
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
