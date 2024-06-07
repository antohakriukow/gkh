import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IDebt } from '~/shared/types/debts'

import { auth, db } from '~/services/_firebase'

export const useSingleDebtData = (debtId: string) => {
	const [isLoading, setIsLoading] = useState(false)

	const [debt, setDebt] = useState<IDebt>({} as IDebt)

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const debtRef = ref(db, `users/${user.uid}/debts/${debtId}`)

				const debtRefUnsubscribe = onValue(debtRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setDebt(snapshot.val())
						setIsLoading(false)
					} else {
						setDebt({} as IDebt)
						setIsLoading(false)
					}
				})

				return () => {
					off(debtRef, 'value', debtRefUnsubscribe)
				}
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [debtId])

	return useMemo(
		() => ({
			isLoading,
			debt
		}),
		[isLoading, debt]
	)
}
