import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth'

export const useRedirect = () => {
	const { user } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate('/reports')
	}, [user, navigate])

	const navigateToResetPassword = () => navigate('/reset-password')
	const navigateToHome = () => navigate('/')

	return { navigateToResetPassword, navigateToHome }
}
