import { Navigate } from 'react-router-dom'
import { useAuth } from '~/hooks'

function RedirectForNotFound() {
	const { user } = useAuth()

	if (user) {
		return <Navigate to='/reports' replace />
	} else {
		return <Navigate to='/' replace />
	}
}

export default RedirectForNotFound
