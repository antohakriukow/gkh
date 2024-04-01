import { calculateSignature } from './calculateSignature'

import { IPaymentData } from '../shared/types/payment.interface'

/**
 * Генерирует URL для перенаправления пользователя на страницу оплаты RoboKassa.
 * @param cost Стоимость товаров.
 * @param invoiceId Идентификатор счета.
 * @param description Описание покупки.
 * @param receipt Объект данных чека.
 * @param isTest Флаг тестового режима (0 или 1).
 * @param userId Firebase uid пользователя.
 * @param type Строка типа TypeService (Для ОИС = 'annual').
 * @param instanceId ID сущности.
 * @returns Строка с URL для оплаты.
 */
export const generatePaymentLink = ({
	cost,
	invoiceId,
	description,
	receipt,
	isTest = 0,
	userId,
	shortId,
	type,
	instanceId
}: IPaymentData): string => {
	const merchantLogin = process.env.REACT_APP_ROBOKASSA_MERCHANT_LOGIN
	const merchantPassword1 = process.env.REACT_APP_ROBOKASSA_PASSWORD1

	if (!merchantLogin || !merchantPassword1) {
		console.error(
			'RoboKassa merchant login and password1 must be set in environment variables.'
		)
		return ''
	}

	const receiptString = JSON.stringify(receipt)
	const encodedReceipt = encodeURIComponent(receiptString)

	const signature = calculateSignature(
		merchantLogin,
		cost,
		invoiceId,
		encodedReceipt,
		merchantPassword1,
		`Shp_instanceId=${instanceId}`,
		`Shp_shortId=${shortId}`,
		`Shp_type=${type}`,
		`Shp_userId=${userId}`
	)

	const queryParams = new URLSearchParams({
		MerchantLogin: merchantLogin,
		OutSum: cost.toString(),
		InvId: invoiceId.toString(),
		Description: description,
		SignatureValue: signature,
		Receipt: encodedReceipt,
		IsTest: isTest.toString(),
		Shp_instanceId: instanceId,
		Shp_shortId: shortId,
		Shp_type: type,
		Shp_userId: userId
	})

	const robokassaPaymentUrl = 'https://auth.robokassa.ru/Merchant/Index.aspx'
	return `${robokassaPaymentUrl}?${queryParams.toString()}`
}
