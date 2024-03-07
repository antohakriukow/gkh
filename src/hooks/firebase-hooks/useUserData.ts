import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { auth, db } from '~/services/_firebase'

export const useUserData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [shortId, setShortId] = useState<string>('')
	const [displayName, setDisplayName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [needToShowIntro, setNeedToShowIntro] = useState<boolean>(false)

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const shortIdRef = ref(db, `users/${user.uid}/shortId`)
				const displayNameRef = ref(db, `users/${user.uid}/displayName`)
				const emailRef = ref(db, `users/${user.uid}/email`)
				const needToShowIntroRef = ref(db, `users/${user.uid}/needToShowIntro`)

				const shortIdRefUnsubscribe = onValue(shortIdRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setShortId(snapshot.val())
						setIsLoading(false)
					} else {
						setShortId('')
						setIsLoading(false)
					}
				})

				const displayNameRefUnsubscribe = onValue(displayNameRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setDisplayName(snapshot.val())
					} else {
						setDisplayName('')
					}
				})

				const emailRefUnsubscribe = onValue(emailRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setEmail(snapshot.val())
					} else {
						setEmail('')
					}
				})

				const needToShowIntroRefUnsubscribe = onValue(
					needToShowIntroRef,
					snapshot => {
						if (snapshot.exists() && snapshot.val()) {
							setNeedToShowIntro(snapshot.val())
						} else {
							setNeedToShowIntro(false)
						}
					}
				)

				return () => {
					off(shortIdRef, 'value', shortIdRefUnsubscribe)
					off(displayNameRef, 'value', displayNameRefUnsubscribe)
					off(emailRef, 'value', emailRefUnsubscribe)
					off(needToShowIntroRef, 'value', needToShowIntroRefUnsubscribe)
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
			userId: shortId,
			displayName,
			email,
			needToShowIntro
		}),
		[isLoading, shortId, displayName, email, needToShowIntro]
	)
}
