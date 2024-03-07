import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IAnnualReport } from '~/shared/types/annual.interface'

import { auth, db } from '~/services/_firebase'

export const useSingleAnnualReportData = (reportId: string) => {
	const [isLoading, setIsLoading] = useState(true)

	const [annualReport, setAnnualReport] = useState<IAnnualReport>(
		{} as IAnnualReport
	)

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const annualReportRef = ref(db, `users/${user.uid}/annuals/${reportId}`)

				const annualReportRefUnsubscribe = onValue(
					annualReportRef,
					snapshot => {
						if (snapshot.exists() && snapshot.val()) {
							setAnnualReport(snapshot.val())
							setIsLoading(false)
						} else {
							setAnnualReport({} as IAnnualReport)
							setIsLoading(false)
						}
					}
				)

				return () => {
					off(annualReportRef, 'value', annualReportRefUnsubscribe)
				}
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [reportId])

	return useMemo(
		() => ({
			isLoading,
			annualReport
		}),
		[isLoading, annualReport]
	)
}
