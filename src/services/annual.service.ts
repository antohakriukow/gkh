import { IAnnualReportSettings } from './../shared/types/annual.interface'
import { child, get, ref, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import {
	IAnnualReport,
	IAnnualReportCreate
} from '~/shared/types/annual.interface'

import { db } from '~/services/_firebase'

export const AnnualService = {
	async _getAll(userId: string) {
		try {
			const snapshot = await get(child(ref(db), `users/${userId}/annuals`))
			if (snapshot.exists()) {
				return Object.values(snapshot.val())
			} else {
				return []
			}
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async getById(userId: string, annualId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/annuals/${annualId}`)
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

	async getSettingsById(userId: string, annualId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/annuals/${annualId}/data/settings`)
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

	async create(userId: string, data: IAnnualReportCreate, annualId: string) {
		if (!data) return

		const newReport = {
			...data,
			_id: annualId,
			createdAt: annualId,
			updatedAt: annualId
		}

		try {
			set(ref(db, `users/${userId}/annuals/${annualId}`), newReport)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async update(userId: string, data: IAnnualReport) {
		if (!data.data) return
		data.updatedAt = Date.now().toString()

		try {
			await update(ref(db, `users/${userId}/annuals/${data._id}`), data)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async updateSettings(
		userId: string,
		annualId: string,
		data: IAnnualReportSettings
	) {
		if (!data.structure) return

		try {
			// const settings = await get(
			// 	child(ref(db), `users/${userId}/annuals/${annualId}/settings`)
			// )
			// console.log('settings')

			await update(ref(db, `users/${userId}/annuals/${annualId}/data`), data)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
