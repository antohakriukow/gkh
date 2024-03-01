import { NextOrObserver, User, onAuthStateChanged } from 'firebase/auth'
import { off, onValue, ref } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'

import { IData } from '~/shared/types/data.interface'
import { IIssue } from '~/shared/types/issue.interface'
import { IMessage } from '~/shared/types/message.interface'

import { auth, db } from '~/services/_firebase'

export const useData = () => {
	const [data, setData] = useState({
		userId: '',
		userUid: '',
		displayName: '',
		email: '',
		needToShowIntro: false,
		currentCompanyInn: '',
		companies: [],
		reports: [],
		annuals: []
	} as IData)
	const [issuesData, setIssuesData] = useState<IIssue[]>([])
	const [messagesData, setMessagesData] = useState<IMessage[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const handleAuthStateChanged: NextOrObserver<User> = user => {
			if (user) {
				const userRef = ref(db, `users/${user.uid}`)
				const issuesRef = ref(db, `issues/${user.uid}`)
				const messagesRef = ref(db, `messages/${user.uid}`)

				// prettier-ignore
				const userUnsubscribe = onValue(userRef, snapshot => {
					let dataFromDB = {} as IData
					if (snapshot.exists()) {
						dataFromDB = {
							userId: snapshot.val().shortId,
							userUid: user.uid,
							displayName: snapshot.val().displayName,
							email: snapshot.val().email,
							needToShowIntro: snapshot.val().needToShowIntro,
							currentCompanyInn: snapshot.val().currentCompanyInn,
							companies: snapshot.val().companies
								? snapshot.val().companies
								: [],
							reports: snapshot.val().reports ? snapshot.val().reports : [],
							annuals: snapshot.val().annuals ? snapshot.val().annuals : []
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
							needToShowIntro: false,
							currentCompanyInn: '',
							companies: [],
							reports: [],
							annuals: []
						})
					}
				})

				const issuesUnsubscribe = onValue(issuesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setIssuesData(Object.values(snapshot.val()))
					} else {
						setIssuesData([])
					}
				})

				const messagesUnsubscribe = onValue(messagesRef, snapshot => {
					if (snapshot.exists() && snapshot.val()) {
						setMessagesData(Object.values(snapshot.val()))
					} else {
						setMessagesData([])
					}
				})

				return () => {
					off(userRef, 'value', userUnsubscribe)
					off(issuesRef, 'value', issuesUnsubscribe)
					off(messagesRef, 'value', messagesUnsubscribe)
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
			currentCompanyInn: data.currentCompanyInn,
			companies: Object.values(data.companies),
			reports: Object.values(data.reports),
			annuals: Object.values(data.annuals),
			displayName: data.displayName,
			email: data.email,
			needToShowIntro: data.needToShowIntro,
			issues: issuesData,
			messages: messagesData
		}),
		[data, issuesData, messagesData, isLoading]
	)
}
