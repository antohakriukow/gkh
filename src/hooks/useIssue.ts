import { IIssueCreate } from './../shared/types/issue.interface'
import { useUserData } from './firebase-hooks/useUserData'
import { useAuth } from './useAuth'
import { useModal } from './useModal'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { IssuesService } from '~/services/issue.service'
import { MessageService } from '~/services/message.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useIssue = () => {
	const { user } = useAuth()
	const { userId, displayName, email } = useUserData()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const createIssue = async (data: IIssueCreate) => {
		setIsLoading(true)
		try {
			if (!user) return

			const timestamp = Date.now().toString()

			const userData = {
				_id: user.uid,
				shortId: userId,
				displayName: displayName ?? '',
				email: email ?? ''
			}

			//Создание Issue и первого сообщения в треде
			await IssuesService.create(userData, data, timestamp)
			await MessageService.create(
				userData,
				'issue',
				timestamp,
				data.description
			)

			const newIssue = await IssuesService.getById(user.uid, timestamp)

			if (!!newIssue) {
				toast.success('Спасибо, что помогаете нам стать лучше!', {
					autoClose: 4000
				})
				return newIssue
			}
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			hideModal()
			setIsLoading(false)
		}
	}

	return { isLoading, createIssue }
}
