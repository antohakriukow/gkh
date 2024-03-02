import { IServiceData } from './prices.interface'

import { ITip } from '~/components/ui/tip/Tip'

export const servicesData = [
	{
		title: 'Отчет 22-ЖКХ',
		description:
			'Услуга по формированию отчета 22-ЖКХ из данных, которые Вы вносите в форму. Форма изменяется в зависимости от внесенных данных. Перед генерацией отчета, а также в процессе заполнения формы данные несколько раз проходят логический контроль, что позволяет минимизировать вероятность получения отрицательного протокола от Росстата.',
		price: 'Бесплатно',
		link: '/reports'
	},
	{
		title: 'Отчет об исполнении сметы',
		description:
			'Услуга по формированию отчета от исполнении сметы для ТСЖ/ЖСК. Есть несколько вариантов шаблона, по которому будет сформирован отчет. Есть возможность быстрой генерации отчета кассовым методом в разрезе контрагентов и операций. Также есть возможность внести информацию об услугах и суммах начислений, а также распределить банковские операции по услугам.',
		price: '990.00 рублей',
		link: '/annual-reports'
	}
] as IServiceData[]

export const infoData = [
	{
		title: 'Поставщик услуг',
		text: 'ИП Крюков Антон Сергеевич, ОГРНИП 318784700367261'
	},
	{
		title: 'Порядок оплаты',
		text: 'Оплата после предварительного просмотра отчет (отчет отображается без цифр). После оплаты все цифры в отчете станут доступны, а также появится возможность скачать отчет в формате xlsx.'
	},
	{
		title: 'Порядок возврата',
		text: 'Возврат денежных средств не осуществляется, так как на момент оплаты отчет полностью сформирован. Оплата отчета означает согласие Клиента со структурой отчета.'
	},
	{
		title: 'Контактная информация',
		text: 'Вопросы, замечания и предложения по работе сервиса просим направлять на email: 22@22gkh.ru'
	}
] as ITip[]
