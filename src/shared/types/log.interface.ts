export type TypeLogCode =
	| 'auth/login'
	| 'auth/register'
	| 'auth/logout'
	| 'report22/create'
	| 'report22/save'
	| 'report22/generate'
	| 'report22/delete'
	| 'report22/xml'
	| 'report22/pdf'
	| 'company/create'
	| 'company/update'
	| 'company/delete'
	| 'issues/error'
	| 'message/error'

export type TypeLogLevel = 'info' | 'error' | 'warning'

export interface IUserDetails {
	id: string
}

export interface ILog {
	timestamp: number
	level: TypeLogLevel
	code: TypeLogCode
	message: string
	user: IUserDetails
	data?: Object
}

export interface ILogDTO
	extends Pick<ILog, 'level' | 'code' | 'user' | 'data'> {}
