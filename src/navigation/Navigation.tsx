import ProtectedRoute from './ProtectedRoute'
import RedirectForNotFound from './RedirectForNotFound'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from '~/components/layout/Layout'
import {
	AccrualsSetter,
	CategoriesSetter,
	CreditSorter,
	DataUploader,
	DebitSorter,
	Preview
} from '~/components/screens/annual-report'
import AnnualReport from '~/components/screens/annual-report -OLD/AnnualReport'
import AnnualReports from '~/components/screens/annual-reports/AnnualReports'
import FAQ from '~/components/screens/faq/FAQ'
import Issues from '~/components/screens/issues/Issues'
import LoginPage from '~/components/screens/landing/LoginPage'
import RegisterPage from '~/components/screens/landing/RegisterPage'
import Prices from '~/components/screens/prices/Prices'
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
				path: 'annual-reports',
				element: (
					<ProtectedRoute>
						<AnnualReports />
					</ProtectedRoute>
				)
			},
			// {
			// 	path: '/annual-reports/edit/:reportId',
			// 	element: (
			// 		<ProtectedRoute>
			// 			<AnnualReport />
			// 		</ProtectedRoute>
			// 	)
			// },
			{
				path: '/annual-reports/edit/:reportId/data-uploader',
				element: (
					<ProtectedRoute>
						<DataUploader />
					</ProtectedRoute>
				)
			},
			{
				path: '/annual-reports/edit/:reportId/categories-setter',
				element: (
					<ProtectedRoute>
						<CategoriesSetter />
					</ProtectedRoute>
				)
			},
			{
				path: '/annual-reports/edit/:reportId/accruals-setter',
				element: (
					<ProtectedRoute>
						<AccrualsSetter />
					</ProtectedRoute>
				)
			},
			{
				path: '/annual-reports/edit/:reportId/credit-sorter',
				element: (
					<ProtectedRoute>
						<CreditSorter />
					</ProtectedRoute>
				)
			},
			{
				path: '/annual-reports/edit/:reportId/debit-sorter',
				element: (
					<ProtectedRoute>
						<DebitSorter />
					</ProtectedRoute>
				)
			},
			{
				path: '/annual-reports/edit/:reportId/preview',
				element: (
					<ProtectedRoute>
						<Preview />
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
				path: '/faq',
				element: (
					<ProtectedRoute>
						<FAQ />
					</ProtectedRoute>
				)
			},
			{
				path: '/prices',
				element: (
					<ProtectedRoute>
						<Prices />
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
