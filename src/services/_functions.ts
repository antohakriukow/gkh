import { addShortIdToUserCF, getCompanyByInnCF } from './_firebase'

export const cloudFunction = {
	async addShortIdToUser() {
		await addShortIdToUserCF()
	},

	async getCompanyByInn(inn: string) {
		const response = await getCompanyByInnCF({ inn })
		return response
	}
}
