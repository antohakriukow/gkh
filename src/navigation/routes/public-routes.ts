import LoginPage from '~/components/screens/landing/LoginPage'
import RegisterPage from '~/components/screens/landing/RegisterPage'
import ResetPassword from '~/components/screens/reset-password/ResetPassword'

export const publicRoutesMap = [
	{
		path: '/',
		component: RegisterPage
	},
	{
		path: '/login',
		component: LoginPage
	},
	{
		path: '/reset-password',
		component: ResetPassword
	}
]
