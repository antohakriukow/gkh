interface BaseStep {
	stepNumber?: number
	stepTitle: string
	onNext: () => void
	onPrevious?: () => void
	onNextButtonTitle?: string
	nextButtonHidden?: boolean
	backButtonHidden?: boolean
}

interface StepWithComponent extends BaseStep {
	component: JSX.Element
	children?: never
}

interface StepWithChildren extends BaseStep {
	component?: never
	children: IQuizStep[]
}

export type IQuizStep = StepWithComponent | StepWithChildren

export interface IQuizProps {
	steps: IQuizStep[]
	initialStepIndex?: number
}
