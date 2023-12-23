import * as admin from 'firebase-admin'

import { IReport } from '../types/report.interface'

export async function getReportData(
	userId: string,
	reportId: string
): Promise<IReport | null> {
	if (!userId || !reportId) {
		throw new Error('userId and reportId are required')
	}

	try {
		const reportRef = admin
			.database()
			.ref(`/users/${userId}/reports/${reportId}`)
		const snapshot = await reportRef.once('value')
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			throw new Error('Report not found')
		}
	} catch (error) {
		console.error('Error getting report data:', error)
		throw error
	}
}
