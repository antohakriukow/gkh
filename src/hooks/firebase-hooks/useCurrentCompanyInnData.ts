import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { auth, db } from '~/services/_firebase'

export const useCurrentCompanyInnData = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [currentCompanyInn, setCurrentCompanyInn] = useState('')

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const currentCompanyInnRef = ref(
					db,
					`users/${user.uid}/currentCompanyInn`
				)

				const currentCompanyInnRefUnsubscribe = onValue(
					currentCompanyInnRef,
					snapshot => {
						if (snapshot.exists() && snapshot.val()) {
							setCurrentCompanyInn(snapshot.val())
							setIsLoading(false)
						} else {
							setCurrentCompanyInn('')
							setIsLoading(false)
						}
					}
				)

				return () => {
					off(currentCompanyInnRef, 'value', currentCompanyInnRefUnsubscribe)
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
			currentCompanyInn
		}),
		[isLoading, currentCompanyInn]
	)
}
