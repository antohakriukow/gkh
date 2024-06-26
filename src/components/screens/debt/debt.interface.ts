import { ReactNode } from 'react'

export type TypeStep = 1 | 2 | 3 | 4

export interface IStep {
	id: TypeStep
	title: string
	component: ReactNode
	isDone: boolean
	color?: string
}
