import { IReportCreate } from './../shared/types/report.interface'
import { cloudFunction } from './_functions'
import { child, get, ref, remove, set, update } from 'firebase/database'
import { toast } from 'react-toastify'

import { IReport } from '~/shared/types/report.interface'

import { db } from '~/services/_firebase'

import { replaceUndefinedAndNaNWithZero } from '~/utils/report.utils'

export const ReportService = {
	async getById(userId: string, reportId: string) {
		try {
			const snapshot = await get(
				child(ref(db), `users/${userId}/reports/${reportId}`)
			)
			if (snapshot.exists()) {
				return snapshot.val()
			} else {
				return null
			}
		} catch (error) {
			if (error instanceof Error) toast(error.message, { autoClose: 3000 })
		}
	},

	async create(userId: string, data: IReportCreate, reportId: string) {
		if (!data) return

		const newReport = {
			...data,
			_id: reportId,
			createdAt: reportId,
			updatedAt: reportId,
			template: `22gkh${data.year}`
		}

		try {
			set(ref(db, `users/${userId}/reports/${reportId}`), newReport)
			cloudFunction.createLog(userId, 'info', 'report22/create', {
				data: newReport
			})
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'report22/create', {
				data: newReport,
				error
			})
		}
	},

	async update(userId: string, data: IReport) {
		if (!data.data) return
		data.updatedAt = Date.now().toString()
		replaceUndefinedAndNaNWithZero(data)

		try {
			await update(ref(db, `users/${userId}/reports/${data._id}`), data)
			cloudFunction.createLog(userId, 'info', 'report22/save', { data })
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'report22/save', { data, error })
		}
	},

	async remove(userId: string, reportId: string) {
		try {
			remove(ref(db, `users/${userId}/reports/${reportId}`))
			cloudFunction.createLog(userId, 'info', 'report22/delete', {
				data: reportId
			})
		} catch (error) {
			cloudFunction.createLog(userId, 'error', 'report22/delete', {
				data: reportId,
				error
			})
		}
	}
}
