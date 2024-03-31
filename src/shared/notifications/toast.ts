import { toast } from 'react-toastify'

const showSuccessNotificationWithText = (text: string) =>
	toast(text, {
		type: 'success',
		autoClose: 1500
	})

const showErrorNotificationWithText = (text: string) =>
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
