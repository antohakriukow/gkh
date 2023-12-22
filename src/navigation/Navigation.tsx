import ProtectedRoute from './ProtectedRoute'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Landing from '~/components/screens/landing/Landing'
import ResetPassword from '~/components/screens/reset-password/ResetPassword'
import Workspace from '~/components/screens/workspace/Workspace'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />
	},
	{
		path: '/reset-password',
		element: <ResetPassword />
	},
	{
		path: 'workspace',
		element: (
			<ProtectedRoute>
				<Workspace />
			</ProtectedRoute>
		)
	}
])

const Navigation: FC = () => {
	return <RouterProvider router={router} />
}
export default Navigation
