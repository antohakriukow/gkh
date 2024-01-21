export interface IQuiz {
	stepNumber: number
	stepTitle: string
	onNext: () => void
	component: JSX.Element
}

export interface IQuizProps {
	steps: IQuiz[]
	finalFunction: () => void
}
