import { FirebaseError } from 'firebase/app'
import { toast } from 'react-toastify'

interface ErrorMapping {
	code: string
	message: string
}

// Показывает уведомление об ошибке firebase
export const handleFirebaseError = (
	error: FirebaseError,
	errorMappings: ErrorMapping[]
) => {
	if (error instanceof FirebaseError) {
		const mapping = errorMappings.find(
			mapping =>
				error.code.includes(mapping.code) ||
				error.message.includes(mapping.code)
		)
		if (mapping) {
			toast.error(mapping.message, { autoClose: 2000 })
		} else {
			toast.error('Что-то пошло не так', { autoClose: 2000 })
		}
	}
}

// Ошибки аутентификации
export const handleAuthErrors = (error: FirebaseError) =>
	handleFirebaseError(error, [
		{
			code: 'auth/invalid-login-credentials',
			message: 'Неверный логин или пароль.'
		},
		{
			code: 'auth/too-many-requests',
			message:
				'Превышено допустимое количество попыток входа. Попробуйте позже.'
		},
		{
			code: 'auth/network-request-failed',
			message:
				'Произошла ошибка сети при попытке отправить запрос. Попробуйте позже.'
		},
		{
			code: 'auth/email-already-in-use',
			message: 'Пользователь с таким email уже зарегистрирован.'
		},
		{
			code: 'auth/wrong-password',
			message: 'Неверный пароль.'
		},
		{
			code: 'auth/invalid-email',
			message: 'Невалидный email.'
		},
		{
			code: 'auth/user-not-found',
			message: 'Пользователь с таким email не найден.'
		}
	])

// Ошибки базы данных
export const handleDBErrors = (error: FirebaseError) =>
	handleFirebaseError(error, [
		{
			code: 'permission_denied',
			message: 'Ошибка доступа.'
		},
		{
			code: 'network_error',
			message: 'Ошибка сети.'
		},
		{
			code: 'disconnected',
			message: 'Нет соединения с сервером.'
		},
		{
			code: 'expired_token',
			message: 'Токен аутентификации истек.'
		},
		{
			code: 'invalid_token',
			message: 'Недействительный токен аутентификации.'
		},
		{
			code: 'max_retries',
			message: 'Превышено максимальное количество попыток.'
		}
	])
