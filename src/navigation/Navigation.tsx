import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from '~/components/screens/home/Home'
import Workspace from '~/components/screens/workspace/Workspace'

import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
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
