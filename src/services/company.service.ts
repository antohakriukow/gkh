import { child, get, ref, remove, set, update } from 'firebase/database'

import { ICompany } from '~/shared/types/company.interface'

import { db } from '~/services/_firebase'

export const CompanyService = {
	async _getAll(userId: string) {
		try {
			const snapshot = await get(child(ref(db), `users/${userId}/companies`))
			if (snapshot.exists()) {
				return Object.values(snapshot.val())
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	},

	async getById(userId: string, companyId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/companies/${companyId}`)
			)
			if (snapshot.exists()) {
				return snapshot.val()
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	},

	async updateCurrentCompanyInn(userId: string, currentCompanyInn: string) {
		if (!currentCompanyInn) return

		update(ref(db, `users/${userId}`), {
			currentCompanyInn: +currentCompanyInn
		})
	},

	async create(userId: string, data: ICompany) {
		if (!data.inn) return
		const companyId = data.inn

		set(ref(db, `users/${userId}/companies/${companyId}`), data)
		this.updateCurrentCompanyInn(userId, companyId.toString())
	},

	async update(userId: string, data: ICompany) {
		if (!data.inn) return

		update(ref(db, `users/${userId}/companies/${data.inn}`), data)
	},

	async remove(userId: string, companyId: string) {
		remove(ref(db, `users/${userId}/companies/${companyId}`))
	}
}
