import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IData } from '~/shared/types/data.interface'

import { auth, db } from '~/services/_firebase'

export const useData = () => {
	const [data, setData] = useState({
		userId: '',
		userUid: '',
		displayName: '',
		email: '',
		companies: [],
		reports: []
	} as IData)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		//NextOrObserver<User>
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				const dataRef = ref(db, `users/${user.uid}`)

				// prettier-ignore
				const unsubscribe = onValue(dataRef, snapshot => {
					let dataFromDB = {} as IData
					if (snapshot.exists()) {
						dataFromDB = {
							userId: snapshot.val().shortId,
							userUid: user.uid,
							displayName: snapshot.val().displayName,
							email: snapshot.val().email,
							companies: snapshot.val().companies
								? snapshot.val().companies
								: [],
							reports: snapshot.val().reports ? snapshot.val().reports : []
						}
					}
					if (dataFromDB) {
						setData(dataFromDB)
					} else {
						setData({
							userId: '',
							userUid: '',
							displayName: '',
							email: '',
							companies: [],
							reports: []
						})
					}
				})

				return () => {
					off(dataRef, 'value', unsubscribe)
				}
			}
		}

		const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged)

		setIsLoading(false)

		return () => {
			if (unsubscribeAuth) unsubscribeAuth()
		}
	}, [])

	return useMemo(
		() => ({
			isLoading,
			userId: data.userId,
			userUid: data.userUid,
			companies: Object.values(data.companies),
			reports: Object.values(data.reports),
			displayName: data.displayName,
			email: data.email
		}),
		[data, isLoading]
	)
}
