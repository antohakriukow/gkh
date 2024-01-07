import { IMessage, TypeMessage } from './../shared/types/message.interface'
import { IOwner } from './../shared/types/shared.types'
import { db } from './_firebase'
import { cloudFunction } from './_functions'
import { ref, set } from 'firebase/database'

export const MessageService = {
	async create(
		user: IOwner,
		type: TypeMessage,
		instanceId: string,
		message: string
	) {
		if (!user._id || !type || !instanceId || !message) return
		const timestamp = Date.now().toString()

		const messageData: IMessage = {
			type,
			parentId: instanceId,
			message: message,
			author: user,
			read: false,
			createdAt: timestamp,
			updatedAt: timestamp
		}

		try {
			await set(ref(db, `messages/${user._id}/${timestamp}`), messageData)
		} catch (error) {
			cloudFunction.createLog(user._id, 'error', 'message/error', {
				data: messageData,
				error
			})
		}
	}
}
