import { TypeMessage } from './../shared/types/message.interface'
import { useData } from './useData'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

import { MessageService } from '~/services/message.service'

import { handleDBErrors } from '~/utils/error.utils'

export const useMessage = () => {
	const { userUid, userId, displayName } = useData()
	const [isLoading, setIsLoading] = useState(false)

	const sendMessage = async (
		type: TypeMessage,
		instanceId: string,
		message: string
	) => {
		setIsLoading(true)
		try {
			if (!userUid) return

			const user = {
				_id: userUid,
				shortId: userId,
				displayName: displayName ?? ''
			}
			await MessageService.create(user, type, instanceId, message)
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, sendMessage }
}
