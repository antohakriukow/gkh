export type TypeService = 'annual'

export interface IUserData {
	_id: string
	email: string
	shortId: string
}

export interface IReceiptItemData {
	name: string
	quantity: number
	sum: number
	payment_method: 'full_payment'
	payment_object: 'service'
	tax: 'none'
}

export interface IReceiptData {
	sno: 'usn_income'
	items: IReceiptItemData[]
}

export interface IPaymentData {
	cost: number
	invoiceId: number
	description: string
	receipt: IReceiptData
	isTest: number
	userId: string
	shortId: string
	type: TypeService
	instanceId: string
}

export interface IPaymentButtonData {
	buttonTitle: string
	onClick: () => void
}

export interface IPayment {
	invoiceId: string
	instanceId: string
	paymentSum: string
	type: TypeService
	timestamp: number
	user: IUserData
}
