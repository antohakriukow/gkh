import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRedirect } from '~/hooks'

import { UserService } from '~/services/user.service'

import { handleAuthErrors } from '~/utils/error.utils'

export const useResetPassword = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { navigateToHome } = useRedirect()

	const handleResetPassword = async (email: string) => {
		setIsLoading(true)
		try {
			if (!email) return
			await UserService.restorePassword(email)
			navigateToHome()
			toast.success(
				`На Ваш email отправлено письмо для восстановления пароля.`,
				{ autoClose: 3000 }
			)
		} catch (error) {
			if (error instanceof FirebaseError) handleAuthErrors(error)
		} finally {
			setIsLoading(false)
		}
	}
	return { isLoading, handleResetPassword }
}
