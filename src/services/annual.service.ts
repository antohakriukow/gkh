import {
	IExtendedBankOperation,
	TypeDefinedAnnualDirection
} from './../shared/types/annual.interface'
import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import {
	IAnnualCategory,
	IAnnualReportCreate,
	IAnnualReportData
} from '~/shared/types/annual.interface'

import { db } from '~/services/_firebase'

export const AnnualService = {
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

	async create(userId: string, data: IAnnualReportCreate, annualId: string) {
		if (!data) return

		const newReport = {
			...data,
			_id: annualId,
			createdAt: annualId,
			updatedAt: annualId,
			data: {
				directions: [],
				accounts: [],
				categories: [],
				operations: [],
				settings: [],
				temporary: []
			}
		}

		try {
			await set(ref(db, `users/${userId}/annuals/${annualId}`), newReport)

			const keysRef = ref(db, `users/${userId}/annuals/keys`)
			const newKey: Record<string, boolean> = {}
			newKey[annualId] = true
			await update(keysRef, newKey)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async update(userId: string, annualId: string, data: IAnnualReportData) {
		if (!data) return
		const updatedAt = Date.now().toString()

		try {
			await update(ref(db, `users/${userId}/annuals/${annualId}`), {
				data,
				updatedAt
			})
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async remove(userId: string, annualId: string) {
		try {
			await remove(ref(db, `users/${userId}/annuals/${annualId}`))
			await remove(ref(db, `users/${userId}/annuals/keys/${annualId}`))
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async updateCategories(
		userId: string,
		annualId: string,
		direction: TypeDefinedAnnualDirection,
		data: IAnnualCategory[]
	) {
		if (!data.length) return

		try {
			await set(
				ref(
					db,
					`users/${userId}/annuals/${annualId}/data/categories/${direction}`
				),
				data
			)
		} catch (error) {
			console.log('ERROR: ', error)
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async updateBankOperations(
		userId: string,
		annualId: string,
		data: IExtendedBankOperation[]
	) {
		if (!data.length) return

		try {
			await set(
				ref(db, `users/${userId}/annuals/${annualId}/data/bankOperations`),
				data
			)
		} catch (error) {
			console.log('ERROR: ', error)
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
