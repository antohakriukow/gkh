import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IHouse } from '~/shared/types/debts/house.interface'

import { auth, db } from '~/services/_firebase'

export const useCounterPartiesData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [counterParties, setCounterParties] = useState<IHouse[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const counterPartiesRef = ref(db, `users/${user.uid}/counter-parties`)

				const counterPartiesRefUnsubscribe = onValue(
					counterPartiesRef,
					snapshot => {
						if (snapshot.exists() && snapshot.val()) {
							setCounterParties(Object.values(snapshot.val()))
							setIsLoading(false)
						} else {
							setCounterParties([])
							setIsLoading(false)
						}
					}
				)

				return () => {
					off(counterPartiesRef, 'value', counterPartiesRefUnsubscribe)
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
			counterParties
		}),
		[isLoading, counterParties]
	)
}
