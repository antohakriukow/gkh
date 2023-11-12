import { IReportCreate } from './../shared/types/report.interface'
import { child, get, ref, remove, set, update } from 'firebase/database'

import { IReport } from '~/shared/types/report.interface'

import { db } from '~/services/_firebase'

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

	async create(userId: string, data: IReportCreate) {
		if (!data) return
		const reportId = Date.now()

		const newReport = {
			...data,
			_id: reportId,
			createdAt: reportId,
			updatedAt: reportId
		}

		// console.log('NEW REPORT: ', newReport)
		set(ref(db, `users/${userId}/reports/${reportId}`), newReport)
	},

	async update(userId: string, data: IReport) {
		if (!data.data) return
		const now = Date.now()

		const updatedReport = { ...data, updatedAt: now }

		update(ref(db, `users/${userId}/reports/${data._id}`), updatedReport)
	},

	async remove(userId: string, reportId: string) {
		remove(ref(db, `users/${userId}/reports/${reportId}`))
	}
}
