import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IMessage } from '~/shared/types/message.interface'

import { auth, db } from '~/services/_firebase'

export const useMessagesData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [messages, setMessages] = useState<IMessage[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const messagesRef = ref(db, `messages/${user.uid}`)

				const messagesUnsubscribe = onValue(messagesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setMessages(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setMessages([])
						setIsLoading(false)
					}
				})

				return () => {
					off(messagesRef, 'value', messagesUnsubscribe)
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
			messages
		}),
		[isLoading, messages]
	)
}
