import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { auth, db } from '~/services/_firebase'

export const useDebtsKeys = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [keys, setKeys] = useState<string[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const keysRef = ref(db, `users/${user.uid}/debts/keys`)

				const keysRefUnsubscribe = onValue(keysRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setKeys(snapshot.val())
						setIsLoading(false)
					} else {
						setKeys([])
						setIsLoading(false)
					}
				})

				return () => {
					off(keysRef, 'value', keysRefUnsubscribe)
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
			keys: Object.keys(keys)
		}),
		[isLoading, keys]
	)
}
