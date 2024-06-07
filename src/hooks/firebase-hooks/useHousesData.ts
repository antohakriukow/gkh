import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IHouse } from '~/shared/types/debts/house.interface'

import { auth, db } from '~/services/_firebase'

export const useHousesData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [houses, setHouses] = useState<IHouse[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const housesRef = ref(db, `users/${user.uid}/houses`)

				const housesRefUnsubscribe = onValue(housesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setHouses(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setHouses([])
						setIsLoading(false)
					}
				})

				return () => {
					off(housesRef, 'value', housesRefUnsubscribe)
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
			houses
		}),
		[isLoading, houses]
	)
}
