import { IOwner } from './shared.types'

export type TypeMessage = 'issue'

export interface IMessage {
	type: TypeMessage
	parentId: string
	message: string
	author: IOwner
	read: boolean
	createdAt: string
	updatedAt?: string
}

export interface IMessageCreate extends Pick<IMessage, 'message'> {}
