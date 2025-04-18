import { FirebaseError } from 'firebase/app'
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
import { toast } from 'react-toastify'
import { useActions } from '~/hooks'

import Modal from '~/components/ui/modal/Modal'

import {
	auth,
	login,
	logout,
	register,
	verifyEmail
} from '~/services/_firebase'
import { cloudFunction } from '~/services/_functions'
import { UserService } from '~/services/user.service'

import { handleAuthErrors } from '~/utils/error/utils'

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
	const { setNewCompany } = useActions()
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
			await verifyEmail(userResponse.user)
			// toast.success(
			// 	`Добро пожаловать! Не забудьте подтвердить электронную почту. Письмо уже отправлено на ${email}.`,
			// 	{ autoClose: false }
			// )
			cloudFunction.createLog(userResponse.user.uid, 'info', 'auth/register')
		} catch (error) {
			if (error instanceof FirebaseError) handleAuthErrors(error)
			cloudFunction.createLog(email, 'error', 'auth/register', {
				data: email,
				error
			})
		} finally {
			setIsLoading(false)
		}
	}

	const loginHandler = async (email: string, password: string) => {
		setIsLoading(true)
		try {
			await login(email, password).then(data => {
				setUser(data.user)
				cloudFunction.createLog(data.user.uid, 'info', 'auth/login')
			})
			toast.success('Добро пожаловать!', { autoClose: 1500 })
		} catch (error) {
			if (error instanceof FirebaseError) handleAuthErrors(error)
			cloudFunction.createLog(email, 'error', 'auth/login', {
				data: email,
				error
			})
		} finally {
			setIsLoading(false)
		}
	}

	const logoutHandler = async () => {
		setIsLoading(true)
		try {
			await logout()
			toast.info('Вы успешно вышли из аккаунта', { autoClose: 1500 })
		} catch (error) {
			if (error instanceof FirebaseError) handleAuthErrors(error)
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
		setNewCompany(null)
	}, [setNewCompany])

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
			{!isLoadingInitial && children}
			{isModalOpen && <Modal component={modalComponent} />}
		</CombinedContext.Provider>
	)
}
