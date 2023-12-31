import {
	IIssueCreate,
	IMessage,
	TypeIssueSubject
} from './../shared/types/issue.interface'
import { useData } from './useData'
import { useModal } from './useModal'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { IssuesService } from '~/services/issue.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useIssue = () => {
	const { userUid, userId, displayName } = useData()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)

	const createIssue = async (data: IIssueCreate) => {
		setIsLoading(true)
		try {
			if (!userUid) return

			const timestamp = Date.now().toString()

			const user = {
				_id: userUid,
				shortId: userId,
				displayName: displayName ?? ''
			}

			await IssuesService.create(user, data, timestamp)

			const newIssue = await IssuesService.getById(userUid, timestamp)

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

	const sendMessage = async (issueId: string, message: string) => {
		setIsLoading(true)
		try {
			if (!userUid) return

			const user = {
				_id: userUid,
				shortId: userId,
				displayName: displayName ?? ''
			}
			await IssuesService.sendMessage(user, issueId, message)
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, createIssue, sendMessage }
}
