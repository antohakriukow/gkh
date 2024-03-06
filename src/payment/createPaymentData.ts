import { generatePaymentLink } from './generatePaymentLink'

import {
	IPaymentButtonData,
	IPaymentData
} from '../shared/types/payment.interface'

// Функция, принимающая параметры оплаты и возвращающая объект с заголовком кнопки и функцией onClick
const createPaymentButtonData = ({
	cost,
	invoiceId,
	description,
	receipt,
	isTest = 0,
	userId,
	shortId,
	type,
	instanceId
}: IPaymentData): IPaymentButtonData => {
	const handlePayment = () => {
		// Генерация URL для перенаправления на страницу оплаты
		const paymentUrl = generatePaymentLink({
			cost,
			invoiceId,
			description,
			receipt,
			isTest,
			userId,
			shortId,
			type,
			instanceId
		})

		if (paymentUrl) {
			// Перенаправление пользователя на страницу оплаты
			window.open(paymentUrl, '_blank')
		} else {
			// Обработка ошибки
			console.error('Ошибка при генерации ссылки на оплату.')
		}
	}

	return {
		buttonTitle: `Скачать за ${cost.toFixed(0)} рублей`,
		onClick: handlePayment
	}
}

export default createPaymentButtonData
