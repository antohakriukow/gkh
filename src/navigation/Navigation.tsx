import ProtectedRoute from './ProtectedRoute'
import RedirectForNotFound from './RedirectForNotFound'
import { protectedRoutesMap } from './routes/protected-routes'
import { publicRoutesMap } from './routes/public-routes'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from '~/components/layout/Layout'

const publicRoutes = publicRoutesMap.map(route => ({
	path: route.path,
	element: <route.component />
}))

const protectedRoutes = protectedRoutesMap.map(route => ({
	path: route.path,
	element: (
		<ProtectedRoute>
			<route.component />
		</ProtectedRoute>
	)
}))

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			...publicRoutes,
			...protectedRoutes,
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
