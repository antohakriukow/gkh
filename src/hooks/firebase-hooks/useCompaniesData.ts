import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { ICompany } from '~/shared/types/company.interface'

import { auth, db } from '~/services/_firebase'

export const useCompaniesData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [companies, setCompanies] = useState<ICompany[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const companiesRef = ref(db, `users/${user.uid}/companies`)

				const companiesRefUnsubscribe = onValue(companiesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setCompanies(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setCompanies([])
						setIsLoading(false)
					}
				})

				return () => {
					off(companiesRef, 'value', companiesRefUnsubscribe)
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
			companies
		}),
		[isLoading, companies]
	)
}
