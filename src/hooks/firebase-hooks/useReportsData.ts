import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IReport } from '~/shared/types/report.interface'

import { auth, db } from '~/services/_firebase'

export const useReportsData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [reports, setReports] = useState<IReport[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const reportsRef = ref(db, `users/${user.uid}/reports`)

				const reportsRefUnsubscribe = onValue(reportsRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setReports(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setReports([])
						setIsLoading(false)
					}
				})

				return () => {
					off(reportsRef, 'value', reportsRefUnsubscribe)
				}
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [])

	return useMemo(
		() => ({
			isLoading,
			reports
		}),
		[isLoading, reports]
	)
}
