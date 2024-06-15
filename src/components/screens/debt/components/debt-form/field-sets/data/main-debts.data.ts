export const monthOptions = [
	{ label: 'Январь', id: 1 },
	{ label: 'Февраль', id: 2 },
	{ label: 'Март', id: 3 },
	{ label: 'Апрель', id: 4 },
	{ label: 'Май', id: 5 },
	{ label: 'Июнь', id: 6 },
	{ label: 'Июль', id: 7 },
	{ label: 'Август', id: 8 },
	{ label: 'Сентябрь', id: 9 },
	{ label: 'Октябрь', id: 10 },
	{ label: 'Ноябрь', id: 11 },
	{ label: 'Декабрь', id: 12 }
]

export const yearOptions = Array.from(
	{ length: 2024 - 2000 + 1 },
	(_, i) => 2024 - i
).map(year => ({
	label: String(year),
	id: year
}))
