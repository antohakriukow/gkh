import { User, onAuthStateChanged } from 'firebase/auth'
import React, {
	FC,
	PropsWithChildren,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react'

import Layout from '~/components/layout/Layout'
import Modal from '~/components/ui/modal/Modal'

import { auth, login, logout, register } from '~/services/_firebase'
import { UserService } from '~/services/user.service'

// Определение интерфейсов для каждого контекста
interface IAuthContext {
	user: User | null
	isLoading: boolean
	register: (email: string, password: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

interface IModalContext {
	showModal: (component: React.ReactNode | null) => void
	hideModal: () => void
}

// Объединенный интерфейс
interface ICombinedContext extends IAuthContext, IModalContext {}

// Создание контекста
export const CombinedContext = createContext<ICombinedContext>(
	{} as ICombinedContext
)

export const CombinedProvider: FC<PropsWithChildren<unknown>> = ({
	children
}) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingInitial, setIsLoadingInitial] = useState(true)
	const [modalComponent, setModalComponent] = useState<React.ReactNode | null>(
		null
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Обработчики для Auth
	const registerHandler = async (email: string, password: string) => {
		setIsLoading(true)
		try {
			const userResponse = await register(email, password)
			if (!userResponse.user.email) return
			await UserService.create(userResponse.user.uid, userResponse.user.email)
		} catch (error: any) {
			console.log('Error reg:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const loginHandler = async (email: string, password: string) => {
		setIsLoading(true)
		try {
			await login(email, password).then(data => {
				setUser(data.user)
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

	// Обработчики для Modal
	const showModal = useCallback((component: React.ReactNode | null) => {
		setModalComponent(component)
		setIsModalOpen(true)
	}, [])

	const hideModal = useCallback(() => {
		setIsModalOpen(false)
		setModalComponent(null)
	}, [])

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
			register: registerHandler,
			login: loginHandler,
			logout: logoutHandler,
			showModal,
			hideModal
		}),
		[user, isLoading, showModal, hideModal]
	)

	return (
		<CombinedContext.Provider value={value}>
			{/* {!isLoadingInitial && children} */}
			<Layout>{!isLoadingInitial && children}</Layout>
			{isModalOpen && <Modal component={modalComponent} />}
		</CombinedContext.Provider>
	)
}
