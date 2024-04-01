import { toast } from 'react-toastify'

export const showSuccessNotificationWithText = (text: string) =>
	toast(text, {
		type: 'success',
		autoClose: 1500
	})

export const showErrorNotificationWithText = (text: string) =>
	toast(text, {
		type: 'error',
		autoClose: 1500
	})

export const showSuccessDataUpdatedNotification = () =>
	showSuccessNotificationWithText('Данные успешно обновлены')

export const showErrorByDataUpdatingNotification = () =>
	showErrorNotificationWithText('Ошибка при обновлении данных')

export const showSuccessReportCreatedNotification = () =>
	showSuccessNotificationWithText('Отчет создан')

export const showErrorByReportCreatingNotification = () =>
	showErrorNotificationWithText('Ошибка при создании отчета')

export const showSuccessDataSavedNotification = () =>
	showSuccessNotificationWithText('Данные сохранены')

export const showSuccessReportGeneratedNotification = () =>
	showSuccessNotificationWithText('Генерация отчета завершена')

export const showEmailConfirmationWasSendedNotification = () =>
	showSuccessNotificationWithText(
		'`На Ваш email отправлено письмо для восстановления пароля.`'
	)
