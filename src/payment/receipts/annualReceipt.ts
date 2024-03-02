import { IReceiptData } from '../../shared/types/payment.interface'
import { AnnualReportPrice } from '../_prices'

export const annualReceipt = {
	sno: 'usn_income',
	items: [
		{
			name: 'Услуга по формированию отчета об исполнении сметы',
			quantity: 1,
			sum: AnnualReportPrice,
			payment_method: 'full_payment',
			payment_object: 'service',
			tax: 'none'
		}
	]
} as IReceiptData
