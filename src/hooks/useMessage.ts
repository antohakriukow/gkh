import { TypeMessage } from './../shared/types/message.interface'
import { useUserData } from './firebase-hooks/useUserData'
import { useAuth } from './useAuth'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'

import { MessageService } from '~/services/message.service'

import { handleDBErrors } from '~/utils/error/utils'

export const useMessage = () => {
	const { user } = useAuth()
	const { userId, displayName } = useUserData()
	const [isLoading, setIsLoading] = useState(false)

	const sendMessage = async (
		type: TypeMessage,
		instanceId: string,
		message: string
	) => {
		setIsLoading(true)
		try {
			if (!user) return

			const userData = {
				_id: user.uid,
				shortId: userId,
				displayName: displayName ?? ''
			}
			await MessageService.create(userData, type, instanceId, message)
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, sendMessage }
}
