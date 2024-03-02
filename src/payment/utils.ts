import md5 from 'md5'

/**
 * Создает подпись MD5 из переданных аргументов.
 * @param args Аргументы, из которых формируется подпись.
 * @returns Хеш-подпись MD5.
 */

export function calculateSignature(...args: (string | number)[]): string {
	console.log('signatureRow: ', args.join(':'))
	return md5(args.join(':'))
}
/**
 * Парсит URL и извлекает из него параметры запроса.
 * @param request Строка URL запроса.
 * @returns Объект с параметрами запроса.
 */
// export function parseResponse(request: string): Record<string, string> {
// 	const parsedUrl = parseUrl(request, true)
// 	return parsedUrl.query as Record<string, string>
// }

/**
 * Проверяет соответствие сгенерированной подписи полученной подписи.
 * @param orderNumber Номер заказа.
 * @param receivedSum Сумма платежа.
 * @param receivedSignature Полученная подпись.
 * @param password Пароль мерчанта.
 * @returns Результат проверки подписи (true или false).
 */
// export function checkSignatureResult(
// 	orderNumber: number,
// 	receivedSum: number,
// 	receivedSignature: string,
// 	password: string
// ): boolean {
// 	const signature = calculateSignature(
// 		receivedSum,
// 		orderNumber,
// 		password
// 	).toLowerCase()
// 	return signature === receivedSignature.toLowerCase()
// }

/**
 * Генерирует URL для перенаправления пользователя на страницу оплаты.
 * @param merchantLogin Логин мерчанта.
 * @param merchantPassword1 Пароль мерчанта.
 * @param cost Стоимость товаров.
 * @param number Номер счета.
 * @param description Описание покупки.
 * @param isTest Флаг тестового режима.
 * @param robokassaPaymentUrl Базовый URL сервиса оплаты.
 * @returns URL для перенаправления на сервис оплаты.
 */
// export function generatePaymentLink(
// 	merchantLogin: string,
// 	merchantPassword1: string,
// 	cost: number,
// 	number: number,
// 	description: string,
// 	isTest = 0,
// 	robokassaPaymentUrl = 'https://auth.robokassa.ru/Merchant/Index.aspx'
// ): string {
// 	const signature = calculateSignature(
// 		merchantLogin,
// 		cost,
// 		number,
// 		merchantPassword1
// 	)

// 	const data = {
// 		MerchantLogin: merchantLogin,
// 		OutSum: cost.toString(),
// 		InvId: number,
// 		Description: description,
// 		SignatureValue: signature,
// 		IsTest: isTest
// 	}

// 	return `${robokassaPaymentUrl}?${stringify(data)}`
// }

/**
 * Обрабатывает уведомление об оплате и проверяет его подлинность.
 * @param merchantPassword2 Второй пароль маранта.
 * @param request Строка запроса с параметрами оплаты.
 * @returns Статус проверки оплаты.
 */
// export function resultPayment(
// 	merchantPassword2: string,
// 	request: string
// ): string {
// 	const paramRequest = parseResponse(request)
// 	const cost = parseFloat(paramRequest['OutSum'])
// 	const number = parseInt(paramRequest['InvId'])
// 	const signature = paramRequest['SignatureValue']

// 	if (checkSignatureResult(number, cost, signature, merchantPassword2)) {
// 		return `OK${paramRequest['InvId']}`
// 	}
// 	return 'bad sign'
// }

/**
 * Проверяет параметры оплаты после успешного завершения операции.
 * @param merchantPassword1 Первый пароль мерчанта.
 * @param request Строка запроса с параметрами оплаты.
 * @returns Сообщение о результате проверки.
 */
// export function checkSuccessPayment(
// 	merchantPassword1: string,
// 	request: string
// ): string {
// 	const paramRequest = parseResponse(request)
// 	const cost = parseFloat(paramRequest['OutSum'])
// 	const number = parseInt(paramRequest['InvId'])
// 	const signature = paramRequest['SignatureValue']

// 	if (checkSignatureResult(number, cost, signature, merchantPassword1)) {
// 		return 'Thank you for using our service'
// 	}
// 	return 'bad sign'
// }
