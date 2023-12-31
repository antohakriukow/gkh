export interface IOwner {
	_id: string
	shortId: string
	displayName: string
}

export interface IMessage {
	message: string
	createdAt: string
	updatedAt?: string
	author: IOwner
}

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
	messages: { [key: string]: IMessage }
}

export interface IIssueCreate extends Pick<IIssue, 'subject' | 'description'> {}

export interface IIssueMessageCreate extends Pick<IMessage, 'message'> {}

export interface IUpdateMessageData {
	[key: string]: IMessage | string
}
