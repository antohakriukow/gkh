import { IFinalReport, IReportCreate } from './../shared/types/report.interface'
import { child, get, ref, remove, set, update } from 'firebase/database'

import { IReport } from '~/shared/types/report.interface'

import { db } from '~/services/_firebase'

import { replaceUndefinedAndNaNWithZero } from '~/utils/report.utils'

export const ReportService = {
	async _getAll(userId: string) {
		try {
			const snapshot = await get(child(ref(db), `users/${userId}/reports`))
			if (snapshot.exists()) {
				return Object.values(snapshot.val())
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	},

	async getById(userId: string, reportId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/reports/${reportId}`)
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

	async create(userId: string, data: IReportCreate, reportId: string) {
		if (!data) return

		const newReport = {
			...data,
			_id: reportId,
			createdAt: reportId,
			updatedAt: reportId,
			template: '22gkh2023'
		}

		set(ref(db, `users/${userId}/reports/${reportId}`), newReport)
	},

	async update(userId: string, data: IReport) {
		if (!data.data) return
		data.updatedAt = Date.now().toString()
		replaceUndefinedAndNaNWithZero(data)

		try {
			await update(ref(db, `users/${userId}/reports/${data._id}`), data)
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error)
		}
	},

	async generate(userId: string, reportId: string, finalReport: IFinalReport) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/reports/${reportId}`)
			)
			if (snapshot.exists()) {
				replaceUndefinedAndNaNWithZero(finalReport)
				console.log(finalReport)
				update(
					ref(db, `users/${userId}/reports/${reportId}/finalReport`),
					finalReport
				)
			} else {
				console.log('NO DATA')
				return []
			}
		} catch (error) {
			console.log(error)
		}
	},

	async remove(userId: string, reportId: string) {
		remove(ref(db, `users/${userId}/reports/${reportId}`))
	}
}
