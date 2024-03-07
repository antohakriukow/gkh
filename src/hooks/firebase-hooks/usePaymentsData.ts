import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IPayment } from '~/shared/types/payment.interface'

import { auth, db } from '~/services/_firebase'

export const usePaymentsData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [payments, setPayments] = useState<IPayment[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const paymentsRef = ref(db, `payments/${user.uid}`)

				const paymentsUnsubscribe = onValue(paymentsRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setPayments(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setPayments([])
						setIsLoading(false)
					}
				})

				return () => {
					off(paymentsRef, 'value', paymentsUnsubscribe)
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
			payments
		}),
		[isLoading, payments]
	)
}
