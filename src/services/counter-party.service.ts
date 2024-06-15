import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import { ICounterParty } from '~/shared/types/debts/counter-party.interface'

import { db } from '~/services/_firebase'

export const CounterPartyService = {
	async getById(userId: string, counterPartyId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/counter-parties/${counterPartyId}`)
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

	async create(userId: string, data: ICounterParty, counterPartyId: string) {
		if (!data) return

		const newCounterParty = {
			...data,
			_id: counterPartyId
		}

		try {
			set(
				ref(db, `users/${userId}/counter-parties/${counterPartyId}`),
				newCounterParty
			)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async update(userId: string, counterPartyId: string, data: ICounterParty) {
		if (!data) return

		try {
			await update(
				ref(db, `users/${userId}/counter-parties/${counterPartyId}`),
				{
					data
				}
			)
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async remove(userId: string, counterPartyId: string) {
		try {
			await remove(ref(db, `users/${userId}/counter-parties/${counterPartyId}`))
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
