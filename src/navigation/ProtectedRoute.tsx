import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth'

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { user } = useAuth()
	const location = useLocation()

	if (!user) {
		return <Navigate to='/' state={{ from: location }} replace />
	}
	return children
}
export default ProtectedRoute
