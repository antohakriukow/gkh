import { IOwner } from './shared.types'

export type TypeIssueType = 'error' | 'question'
export type TypeIssueStatus = 'open' | 'closed' | 'pending' | 'resolved'
export type TypeIssuePriority = 'low' | 'medium' | 'high'

export type TypeIssueSubject =
	| 'report/create'
	| 'report/generate'
	| 'report/pdf'
	| 'report/error'
	| 'report/declined'
	| 'report/other'
	| 'annual/upload'
	| 'annual/process'
	| 'annual/download'
	| 'annual/payment'
	| 'annual/result'
	| 'auth'
	| 'other'

export interface IIssue {
	_id: string
	shortId: string
	createdAt: string //
	updatedAt: string
	owner: IOwner
	status: TypeIssueStatus //
	priority: TypeIssuePriority
	type: TypeIssueType
	subject: TypeIssueSubject //
	description: string
}

export interface IIssueCreate extends Pick<IIssue, 'subject' | 'description'> {}
