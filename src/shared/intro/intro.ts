import { Locale } from 'react-joyride'

const russianLocale: Locale = {
	back: 'Назад',
	close: 'Закрыть',
	last: 'Завершить',
	next: 'Далее',
	open: 'Открыть диалог',
	skip: 'Пропустить'
}

const introSteps = [
	{
		target: '.addReportButtonAnchor',
		content:
			'Здравствуйте! Не забудьте подтвердить Ваш email - письмо для подтверждения уже у Вас на почте. Далее - краткий обучающий тур.',
		placement: 'center' as const
	},
	{
		target: '.faqButtonAnchor',
		content:
			'Видео-инструкцию, правила заполнения и ответы на часто задаваемые вопросы Вы найдете тут.',
		placement: 'bottom' as const
	},
	{
		target: '.supportButtonAnchor',
		content:
			'Если вдруг столкнетесь с ошибками или Ваш отчет отклонит Росстат - создайте обращение в техподдержку. Мы поможем решить проблему.',
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
			Если нужно добавить еще компанию - откройте меню и нажмите "Добавить компанию". Переключение между компаниями также осуществляйте в меню. Также в меня Вы найдете "код клиента" и кнопку выход.`,
		placement: 'bottom' as const
	}
]

export { introSteps, russianLocale }
