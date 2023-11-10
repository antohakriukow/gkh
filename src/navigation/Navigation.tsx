import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Auth from '~/components/screens/auth/Auth'
import Workspace from '~/components/screens/workspace/Workspace'

import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Auth />
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
