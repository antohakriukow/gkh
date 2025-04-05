export type TypePeriod = 1 | 2 | 3 | 4

export type TypeYear = number & { __brand: 'TypeYear' }

export const toTypeYear = (year: number): TypeYear => {
	if (year < 2000 || year > new Date().getFullYear()) {
		throw new Error('Invalid TypeYear: ' + year)
	}
	return year as TypeYear
}

export type TypeMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type TypeDayOfMonth =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
	| 25
	| 26
	| 27
	| 28
	| 29
	| 30
	| 31
