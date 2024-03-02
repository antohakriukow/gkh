import { generatePaymentLink } from './generatePaymentLink'
import { IPaymentButtonData, IPaymentData } from './payment.interface'

// Функция, принимающая параметры оплаты и возвращающая объект с заголовком кнопки и функцией onClick
const createPaymentButtonData = ({
	cost,
	invoiceId,
	description,
	receipt,
	isTest = 0,
	userId,
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
			type,
			instanceId
		})

		if (paymentUrl) {
			// Перенаправление пользователя на страницу оплаты
			console.log('paymentUrl: ', paymentUrl)
			window.open(paymentUrl, '_blank')
		} else {
			// Обработка ошибки
			console.error('Ошибка при генерации ссылки на оплату.')
		}
	}

	return {
		buttonTitle: `Оплатить ${cost.toFixed(0)} рублей`,
		onClick: handlePayment
	}
}

export default createPaymentButtonData
