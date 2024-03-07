import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IIssue } from '~/shared/types/issue.interface'

import { auth, db } from '~/services/_firebase'

export const useIssuesData = () => {
	const [isLoading, setIsLoading] = useState(true)

	const [issues, setIssues] = useState<IIssue[]>([])

	useEffect(() => {
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				setIsLoading(true)
				const issuesRef = ref(db, `issues/${user.uid}`)

				const issuesUnsubscribe = onValue(issuesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setIssues(Object.values(snapshot.val()))
						setIsLoading(false)
					} else {
						setIssues([])
						setIsLoading(false)
					}
				})

				return () => {
					off(issuesRef, 'value', issuesUnsubscribe)
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
			issues
		}),
		[isLoading, issues]
	)
}
