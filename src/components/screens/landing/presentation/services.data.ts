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
		links: [
			{
				url: 'https://www.youtube.com/embed/JGUO_0oV5AA',
				title: 'Смотреть видео'
			}
		]
	},
	{
		title: 'Отчет об исполнении сметы',
		bullets: ['Время заполнения от 1 минуты', 'Формат XLSX', 'Бесплатно'],
		links: [
			{
				url: 'https://www.youtube.com/embed/lqgpLNk4GRY',
				title: 'Автоматический режим'
			},
			{
				url: 'https://www.youtube.com/embed/qxgDCMPe-vU',
				title: 'Ручной режим'
			}
		]
	},
	{
		title: 'Генератор документов для суда',
		bullets: ['Расчет пени', 'Судебные приказы', 'Бесплатно'],
		links: [
			{
				url: 'https://www.youtube.com/embed/I4EGNgSFvUY',
				title: 'Смотреть видео'
			}
		]
	}
] as IService[]
