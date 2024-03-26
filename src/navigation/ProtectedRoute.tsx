import { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { Loader } from '~/components/ui'

import { useAuth } from '~/hooks/useAuth'

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { user } = useAuth()
	const location = useLocation()

	if (!user) {
		return <Navigate to='/' state={{ from: location }} replace />
	}
	return <Suspense fallback={<Loader />}>{children}</Suspense>
}
export default ProtectedRoute
