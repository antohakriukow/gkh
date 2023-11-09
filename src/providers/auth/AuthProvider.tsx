import { User, onAuthStateChanged } from 'firebase/auth'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import Layout from '~/components/layout/Layout'

import { auth, login, logout, register } from '~/services/_firebase'
import { UserService } from '~/services/user.service'

interface IContext {
	user: User | null
	isLoading: boolean
	register: (email: string, password: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingInitial, setIsLoadingInitial] = useState(true)

	const registerHandler = async (email: string, password: string) => {
		setIsLoading(true)

		try {
			const userResponse = await register(email, password)
			if (!userResponse.user.email) return
			await UserService.create(userResponse.user.uid, userResponse.user.email)
		} catch (error: any) {
			console.log('Error reg:', error)
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const loginHandler = async (email: string, password: string) => {
		setIsLoading(true)

		try {
			await login(email, password).then(data => {
				setUser(data.user)
				console.log(data.user)
			})
		} catch (error: any) {
			console.log('Error login:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const logoutHandler = async () => {
		setIsLoading(true)

		try {
			await logout()
		} catch (error: any) {
			console.log('Error logout:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUser(user || null)
			setIsLoadingInitial(false)
		})
	}, [])

	const value = useMemo(
		() => ({
			user,
			isLoading,
			login: loginHandler,
			logout: logoutHandler,
			register: registerHandler
		}),
		[user, isLoading]
	)

	return (
		<AuthContext.Provider value={value}>
			<Layout>{!isLoadingInitial && children}</Layout>
		</AuthContext.Provider>
	)
}
