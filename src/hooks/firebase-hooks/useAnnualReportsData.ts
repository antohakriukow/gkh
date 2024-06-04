import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { child, get, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

import { IAnnualReportDetails } from '~/shared/types/annual.interface'

import { auth, db } from '~/services/_firebase'

export const useAnnualReportsData = (keys: string[]) => {
	const [isLoading, setIsLoading] = useState(false)
	const [annuals, setAnnuals] = useState<IAnnualReportDetails[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user && keys.length > 0) {
				setIsLoading(true)

				const fetchAnnualsDetails = async () => {
					const annualsRef = ref(db, `users/${user.uid}/annuals`)
					try {
						const annualsDetails = await Promise.all(
							keys.map(async key => {
								const idSnapshot = await get(child(annualsRef, `${key}/_id`))
								const typeSnapshot = await get(child(annualsRef, `${key}/type`))
								const structureSnapshot = await get(
									child(annualsRef, `${key}/data/settings/structure`)
								)
								const innSnapshot = await get(
									child(annualsRef, `${key}/company/inn`)
								)
								const updatedAtSnapshot = await get(
									child(annualsRef, `${key}/updatedAt`)
								)

								return {
									_id: idSnapshot.val(),
									inn: innSnapshot.val(),
									type: typeSnapshot.val(),
									structure: structureSnapshot.val(),
									updatedAt: updatedAtSnapshot.val()
								}
							})
						)

						setAnnuals(annualsDetails)
					} catch (error) {
						console.error('Error fetching annual reports data: ', error)
					} finally {
						setIsLoading(false)
					}
				}

				fetchAnnualsDetails()
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [keys])

	return { isLoading, annualsDetails: annuals }
}
