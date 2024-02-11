export interface IQuizStep {
	stepNumber?: number
	stepTitle: string
	onPrevious?: () => void
	onNext: () => void
	onNextButtonTitle?: string
	component: JSX.Element
	nextButtonHidden?: boolean
	backButtonHidden?: boolean
}

export interface IQuizProps {
	steps: IQuizStep[]
	finalFunction: () => void
	finalButtonTitle?: string
	initialStepIndex?: number
}
