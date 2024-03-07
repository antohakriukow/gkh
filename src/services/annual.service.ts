import {
	IAnnualReportSettings,
	IExtendedBankOperation,
	TypeAnnualOperationTag,
	TypeDefinedAnnualDirection
} from './../shared/types/annual.interface'
import { child, get, push, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import {
	IAnnualCategory,
	IAnnualReportCreate,
	IAnnualReportData
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

	async updateSettings(
		userId: string,
		annualId: string,
		data: IAnnualReportSettings
	) {
		if (!data.structure) return

		try {
			await update(
				ref(db, `users/${userId}/annuals/${annualId}/data/settings`),
				data
			)
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
	},

	async updateBankOperationTags(
		userId: string,
		annualId: string,
		tag: TypeAnnualOperationTag,
		operationIds: string[]
	) {
		if (tag === undefined || operationIds.length === 0) return

		// Объявление объекта updates с индексируемым типом
		const updates: { [key: string]: TypeAnnualOperationTag } = {}
		operationIds.forEach(operationId => {
			updates[
				`/users/${userId}/annuals/${annualId}/data/bankOperations/${operationId}/tag`
			] = tag
		})

		try {
			await update(ref(db), updates)
		} catch (error) {
			console.log('ERROR: ', error)
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async updateBankOperationCategories(
		userId: string,
		annualId: string,
		categoryId: string,
		operationIds: string[]
	) {
		if (categoryId === undefined || operationIds.length === 0) return

		// Объявление объекта updates с индексируемым типом
		const updates: { [key: string]: string } = {}
		operationIds.forEach(operationId => {
			updates[
				`/users/${userId}/annuals/${annualId}/data/bankOperations/${operationId}/categoryId`
			] = categoryId
		})

		try {
			await update(ref(db), updates)
		} catch (error) {
			console.log('ERROR: ', error)
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async replaceOperation(
		userId: string,
		annualId: string,
		newOperations: IExtendedBankOperation[],
		removingOperationId: string
	) {
		try {
			// Удаление указанной операции
			const removingRef = ref(
				db,
				`/users/${userId}/annuals/${annualId}/data/bankOperations/${removingOperationId}`
			)
			await remove(removingRef)

			// Подготовка объекта для добавления новых операций с явной индексной сигнатурой
			const updates: { [operationPath: string]: IExtendedBankOperation } = {}
			newOperations.forEach(operation => {
				const operationPath = `/users/${userId}/annuals/${annualId}/data/bankOperations/${operation._id}`
				updates[operationPath] = operation
			})

			// Добавление новых операций с использованием метода update для обновления на уровне базы данных
			if (Object.keys(updates).length > 0) {
				await update(ref(db), updates)
			}
		} catch (error) {
			console.log('ERROR: ', error)
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	}
}
