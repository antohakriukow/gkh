import ProtectedRoute from './ProtectedRoute'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Landing from '~/components/screens/landing/Landing'
import ReportEditor from '~/components/screens/report/ReportEditor'
import Reports from '~/components/screens/reports/Reports'
import ResetPassword from '~/components/screens/reset-password/ResetPassword'

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
		path: 'reports',
		element: (
			<ProtectedRoute>
				<Reports />
			</ProtectedRoute>
		)
	},
	{
		path: '/reports/edit/:reportId',
		element: (
			<ProtectedRoute>
				<ReportEditor />
			</ProtectedRoute>
		)
	}
])

const Navigation: FC = () => {
	return <RouterProvider router={router} />
}
export default Navigation
