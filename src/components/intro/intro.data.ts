import { Locale } from 'react-joyride'

export const russianLocale: Locale = {
	back: 'Назад',
	close: 'Закрыть',
	last: 'Завершить',
	next: 'Далее',
	open: 'Открыть диалог',
	skip: 'Пропустить'
}

export const introSteps = [
	{
		target: '.addReportButtonAnchor',
		content:
			'Здравствуйте! Не забудьте подтвердить Ваш email - письмо для подтверждения уже у Вас на почте. Далее - краткий обучающий тур.',
		placement: 'center' as const
	},
	{
		target: '.faqButtonAnchor',
		content:
			'Видео-инструкции и ответы на часто задаваемые вопросы Вы найдете тут.',
		placement: 'bottom' as const
	},
	{
		target: '.supportButtonAnchor',
		content:
			'Если Вы столкнетесь с ошибками в работе сервиса или захотите связаться с нами - создайте обращение тут. Мы обязательно ответим!',
		placement: 'bottom' as const
	},
	{
		target: '.addReportButtonAnchor',
		content: 'Начните с добавления первой компании, нажав эту кнопку.',
		placement: 'bottom' as const
	},
	{
		target: '.menuButtonAnchor',
		content: `
			Если нужно добавить еще компанию - откройте меню и нажмите "Добавить компанию". Переключение между компаниями также осуществляйте в меню.`,
		placement: 'bottom' as const
	},
	{
		target: '.reportsAnchor',
		content: 'Тут можно сформировать отчет 22-ЖКХ. Это бесплатно.',
		placement: 'bottom' as const
	},
	{
		target: '.annualsAnchor',
		content:
			'А тут находится мощный инструмент для создания отчета об исполнении сметы.',
		placement: 'bottom' as const
	},
	{
		target: '.priceAnchor',
		content: 'Цены и прочая полезная информация тут. Желаем приятной работы!',
		placement: 'bottom' as const
	}
]
