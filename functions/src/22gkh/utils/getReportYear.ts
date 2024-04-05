import * as admin from 'firebase-admin'

export async function getReportYear(
	userId: string,
	reportId: string
): Promise<number | null> {
	console.log('getReportYear EXECUTION STARTED')

	if (!userId || !reportId) {
		throw new Error('userId and reportId are required')
	}

	try {
		const reportYearRef = admin
			.database()
			.ref(`/users/${userId}/reports/${reportId}/year`)
		const snapshot = await reportYearRef.once('value')
		if (snapshot.exists()) {
			return snapshot.val()
		} else {
			throw new Error('Report year not found')
		}
	} catch (error) {
		console.error('Error getting report year:', error)
		throw error
	}
}
