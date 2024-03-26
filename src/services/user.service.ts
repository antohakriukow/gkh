import { cloudFunction } from './_functions'
import {
	EmailAuthProvider,
	User,
	reauthenticateWithCredential,
	updateEmail,
	updatePassword
} from 'firebase/auth'
import { ref, set, update } from 'firebase/database'

import { db, resetPassword } from '~/services/_firebase'

export const UserService = {
	async create(userId: string, email: string) {
		await set(ref(db, `users/${userId}`), {
			displayName: 'Пользователь',
			needToShowIntro: true,
			email: email
		})
		await cloudFunction.addShortIdToUser()
	},

	async setDoNotShowIntroAgain(userId: string) {
		await update(ref(db, `users/${userId}`), {
			needToShowIntro: false
		})
	},

	async updateUserEmail(user: User, newEmail: string, currentPassword: string) {
		if (!user || !user.email) return
		const credential = EmailAuthProvider.credential(user.email, currentPassword)

		await reauthenticateWithCredential(user, credential)
		updateEmail(user, newEmail)
	},

	async restorePassword(email: string) {
		if (!email) return
		await resetPassword(email)
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
