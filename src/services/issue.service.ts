import {
	IIssue,
	IIssueCreate,
	IMessage,
	IOwner,
	IUpdateMessageData
} from './../shared/types/issue.interface'
import { cloudFunction } from './_functions'
import { child, get, push, ref, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import { db } from '~/services/_firebase'

import { getIssueSubject } from '~/utils/issue.utils'

export const IssuesService = {
	async getAll(userId: string) {
		try {
			const snapshot = await get(child(ref(db), `issues/${userId}`))
			if (snapshot.exists()) {
				return Object.values(snapshot.val())
			} else {
				return []
			}
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async getById(userId: string, issueId: string) {
		try {
			const snapshot = await get(child(ref(db), `issues/${userId}/${issueId}`))
			if (snapshot.exists()) {
				return snapshot.val()
			} else {
				return []
			}
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async create(user: IOwner, data: IIssueCreate, timestamp: string) {
		if (!data || !user._id) return

		const issues = (await this.getAll(user._id)) ?? []

		const shortId = `${user.shortId}-${Object.values(issues).length + 1}`

		const messageRef = push(ref(db, `issues/${user._id}/messages`))
		const newMessageKey = messageRef.key

		if (!newMessageKey) return

		const messageObject: IMessage = {
			message: `[${getIssueSubject(data.subject)}]: ${data.description}`,
			createdAt: timestamp,
			updatedAt: timestamp,
			author: user
		}

		const messageData = {
			[newMessageKey]: messageObject
		}

		const issue = {
			_id: timestamp,
			shortId: shortId,
			createdAt: timestamp,
			updatedAt: timestamp,
			owner: user,
			status: 'open',
			priority: 'low',
			messages: messageData,
			subject: data.subject,
			type: 'error',
			description: data.description
		} as IIssue

		try {
			await set(ref(db, `issues/${user._id}/${timestamp}`), issue)
		} catch (error) {
			cloudFunction.createLog(user._id, 'error', 'issues/error', {
				data: issue,
				error
			})
		}
	},
	async sendMessage(user: IOwner, issueId: string, message: string) {
		if (!user._id || !issueId || !message) return
		const timestamp = Date.now().toString()

		const messageData: IMessage = {
			message: message,
			createdAt: timestamp,
			updatedAt: timestamp,
			author: user
		}

		const updates: IUpdateMessageData = {} // Используем определенный тип для объекта обновлений
		const newMessageKey = push(
			ref(db, `issues/${user._id}/${issueId}/messages`)
		).key

		updates[`issues/${user._id}/${issueId}/messages/${newMessageKey}`] =
			messageData
		updates[`issues/${user._id}/${issueId}/updatedAt`] = timestamp

		try {
			await update(ref(db), updates)
		} catch (error) {
			cloudFunction.createLog(user._id, 'error', 'issues/error', {
				data: { messageData, updates },
				error
			})
		}
	},

	async close(user: IOwner, issueId: string, message: string) {
		if (!user._id || !issueId || !message) return
		const timestamp = Date.now().toString()

		const data = {
			status: 'closed',
			updatedAt: timestamp
		}

		try {
			await update(ref(db, `issues/${user._id}/${issueId}`), data)
		} catch (error) {
			cloudFunction.createLog(user._id, 'error', 'issues/error', {
				data,
				error
			})
		}
	}
}
