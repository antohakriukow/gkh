import { TypeAnnualReportStructure } from '~/shared/types/annual.interface'

export interface IStructureTypes {
	type: TypeAnnualReportStructure
	title: string
	description: string
	link: string
}
export const data: IStructureTypes[] = [
	{
		type: 'cash/partners',
		title: 'Кассовый метод: в разрезе получателей и плательщиков',
		description:
			'Потребуется загрузить банковские выписки в формате 1С 8.3. Большинство работы по заполнению отчета за Вас сделает алгоритм.',
		link: 'https://disk.yandex.ru/i/6JhIXaT1PXSYAQ'
	},
	{
		type: 'cash/services',
		title: 'Кассовый метод: в разрезе услуг',
		description:
			'Потребуется загрузить банковские выписки в формате 1С 8.3. Также потребуется внести список статей, по которым УО производит начисление и распределить списания с расчетных счетов по статьям.',
		link: 'https://disk.yandex.ru/i/CRzKuDLdRxlxGg'
	}
	// INFO: функционал на стадии разработки

	// {
	// 	type: 'accruals/services',
	// 	title: 'Метод начислений: в разрезе услуг',
	// 	description:
	// 		'Потребуется загрузить журнал проводок из 1С в формате xlsx. Алгоритм распределит начисления и оплаты в соответствии с данными бухгалтерского учета.',
	// 	link: ''
	// }
]

export const WATCH_EXAMPLE = 'Смотреть образец'
