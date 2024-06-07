import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import { IHouse } from '~/shared/types/debts'

import { db } from '~/services/_firebase'

export const HouseService = {
	async getById(userId: string, houseId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/houses/${houseId}`)
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

	async create(userId: string, data: IHouse, houseId: string) {
		if (!data) return

		const newHouse = {
			...data,
			_id: houseId
		}

		try {
			set(ref(db, `users/${userId}/houses/${houseId}`), newHouse)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async update(userId: string, houseId: string, data: IHouse) {
		if (!data) return

		try {
			await update(ref(db, `users/${userId}/houses/${houseId}`), {
				data
			})
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async remove(userId: string, houseId: string) {
		try {
			await remove(ref(db, `users/${userId}/houses/${houseId}`))
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
