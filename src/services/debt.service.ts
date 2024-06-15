import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import { IDebt, IDebtCreate } from '~/shared/types/debts/debt.interface'

import { db } from '~/services/_firebase'

import { replaceUndefinedAndNaNWithZString } from '~/utils/debt/debt'

export const DebtService = {
	async getById(userId: string, debtId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/debts/${debtId}`)
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

	async create(userId: string, data: IDebtCreate, debtId: string) {
		if (!data) return

		const newDebt = {
			...data,
			_id: debtId,
			createdAt: debtId,
			updatedAt: debtId
		}

		try {
			await set(ref(db, `users/${userId}/debts/${debtId}`), newDebt)

			const keysRef = ref(db, `users/${userId}/debts/keys`)
			const newKey: Record<string, boolean> = {}
			newKey[debtId] = true
			await update(keysRef, newKey)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async update(userId: string, debtId: string, data: IDebt) {
		if (!data) return
		const updatedAt = Date.now().toString()
		replaceUndefinedAndNaNWithZString(data)

		try {
			await update(ref(db, `users/${userId}/debts/${debtId}`), {
				...data,
				updatedAt
			})
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async remove(userId: string, debtId: string) {
		try {
			await remove(ref(db, `users/${userId}/debts/${debtId}`))
			await remove(ref(db, `users/${userId}/debts/keys/${debtId}`))
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
