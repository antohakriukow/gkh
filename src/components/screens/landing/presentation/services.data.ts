import { IService } from './interface.presentation'

export const servicesData = [
	{
		title: '22-ЖКХ (жилище)',
		bullets: [
			'Всегда актуальный шаблон',
			'Алгоритм Росстата',
			'Простой интерфейс',
			'Бесплатно'
		],
		link: 'https://www.youtube.com/embed/JGUO_0oV5AA'
	},
	{
		title: 'Отчет об исполнении сметы - режим автозаполнения',
		bullets: ['Время заполнения - 1 минута', 'Формат XLSX'],
		link: 'https://www.youtube.com/embed/lqgpLNk4GRY'
	},
	{
		title: 'Отчет об исполнении сметы - ручной режим',
		bullets: [
			'Время заполнения 10-30 минут',
			'Формат XLSX',
			'Удобный редактор отчета'
		],
		link: 'https://www.youtube.com/embed/qxgDCMPe-vU'
	}
] as IService[]
