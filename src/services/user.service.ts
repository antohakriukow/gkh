import {
	EmailAuthProvider,
	User,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword
} from 'firebase/auth'
import { ref, set } from 'firebase/database'

import { db } from '~/services/_firebase'

export const UserService = {
	async create(userId: string, email: string) {
		set(ref(db, `users/${userId}`), {
			displayName: 'No name',
			email: email
		})
	},

	async updateUserEmail(user: User, newEmail: string, currentPassword: string) {
		if (!user || !user.email) return
		const credential = EmailAuthProvider.credential(user.email, currentPassword)

		await reauthenticateWithCredential(user, credential)
		updateEmail(user, newEmail)
	},

	async updateUserPassword(
		user: User,
		newPassword: string,
		currentPassword: string
	) {
		if (!user || !user.email) return
		const credential = EmailAuthProvider.credential(user.email, currentPassword)

		await reauthenticateWithCredential(user, credential)
		updatePassword(user, newPassword)
	}
}
