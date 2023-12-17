import { addShortIdToUserCF } from './_firebase'

export const cloudFunction = {
	async addShortIdToUser() {
		await addShortIdToUserCF()
	}
}
