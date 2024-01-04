import ProtectedRoute from './ProtectedRoute'
import RedirectForNotFound from './RedirectForNotFound'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from '~/components/layout/Layout'
import Issues from '~/components/screens/issues/Issues'
import LoginPage from '~/components/screens/landing/LoginPage'
import RegisterPage from '~/components/screens/landing/RegisterPage'
import ReportEditor from '~/components/screens/report/ReportEditor'
import Reports from '~/components/screens/reports/Reports'
import ResetPassword from '~/components/screens/reset-password/ResetPassword'

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <RegisterPage />
			},
			{
				path: '/login',
				element: <LoginPage />
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
			},
			{
				path: '/issues',
				element: (
					<ProtectedRoute>
						<Issues />
					</ProtectedRoute>
				)
			},
			{
				path: '*',
				element: <RedirectForNotFound />
			}
		]
	}
])

const Navigation: FC = () => {
	return <RouterProvider router={router} />
}
export default Navigation
