import { cloudFunction } from './_functions'
import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

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
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
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
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
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

		try {
			set(ref(db, `users/${userId}/companies/${companyId}`), data)
			this.updateCurrentCompanyInn(userId, companyId.toString())
			cloudFunction.createLog(userId, 'info', 'company/create', { data })
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'company/create', {
				data,
				error
			})
		}
	},

	async update(userId: string, data: ICompany) {
		if (!data.inn) return
		try {
			update(ref(db, `users/${userId}/companies/${data.inn}`), data)
			cloudFunction.createLog(userId, 'info', 'company/update', { data })
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'company/update', {
				data,
				error
			})
		}
	},

	async remove(userId: string, companyId: string) {
		try {
			remove(ref(db, `users/${userId}/companies/${companyId}`))
			cloudFunction.createLog(userId, 'info', 'company/update', {
				data: companyId
			})
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'company/update', {
				data: companyId,
				error
			})
		}
	}
}
