import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { child, get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

import { IDebtDetails } from '~/shared/types/debts/debt.interface'

import { auth, db } from '~/services/_firebase'

export const useDebtsData = (keys: string[]) => {
	const [isLoading, setIsLoading] = useState(false)
	const [debts, setDebts] = useState<IDebtDetails[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user && keys.length > 0) {
				setIsLoading(true)

				const fetchDebtsDetails = async () => {
					const debtsRef = ref(db, `users/${user.uid}/debts`)
					try {
						const debtsDetails = await Promise.all(
							keys.map(async key => {
								const idSnapshot = await get(child(debtsRef, `${key}/_id`))
								const addressSnapshot = await get(
									child(debtsRef, `${key}/address`)
								)
								const collectorSnapshot = await get(
									child(debtsRef, `${key}/collector`)
								)
								const mainSnapshot = await get(child(debtsRef, `${key}/main`))
								const penaltiesSnapshot = await get(
									child(debtsRef, `${key}/penalties`)
								)
								const dutySnapshot = await get(child(debtsRef, `${key}/duty`))
								const updatedAtSnapshot = await get(
									child(debtsRef, `${key}/updatedAt`)
								)

								return {
									_id: idSnapshot.val(),
									address: addressSnapshot.val(),
									collector: collectorSnapshot.val(),
									main: mainSnapshot.val(),
									penalties: penaltiesSnapshot.val(),
									duty: dutySnapshot.val(),
									updatedAt: updatedAtSnapshot.val()
								}
							})
						)

						setDebts(debtsDetails)
					} catch (error) {
						console.error('Error fetching debts data: ', error)
					} finally {
						setIsLoading(false)
					}
				}

				fetchDebtsDetails()
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [keys])

	return { isLoading, debtsDetails: debts }
}
