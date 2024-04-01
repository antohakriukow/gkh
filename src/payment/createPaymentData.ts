import { generatePaymentLink } from './generatePaymentLink'

import {
	IPaymentButtonData,
	IPaymentData
} from '../shared/types/payment.interface'

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
			window.open(paymentUrl, '_blank')
		} else {
			console.error('Ошибка при генерации ссылки на оплату.')
		}
	}

	return {
		buttonTitle: `Скачать за ${cost.toFixed(0)} рублей`,
		onClick: handlePayment
	}
}

export default createPaymentButtonData
