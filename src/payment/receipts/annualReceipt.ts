import { IReceiptData } from '../payment.interface'

export const annualReceipt = {
	sno: 'usn_income',
	items: [
		{
			name: 'Услуга по формированию отчета об исполнении сметы',
			quantity: 1,
			sum: 990,
			payment_method: 'full_payment',
			payment_object: 'service',
			tax: 'none'
		}
	]
} as IReceiptData
