export function areArraysEqualByKey<T>(
	arr1: T[],
	arr2: T[],
	comparator: keyof T,
	key: keyof T
): boolean {
	console.log('areArraysEqualByKey data: ', arr1, arr2, comparator, key)

	if (arr1.length !== arr2.length) {
		return false
	}

	const sortedArr1 = [
		...arr1.sort((a, b) =>
			String(a[comparator]).localeCompare(String(b[comparator]))
		)
	]

	const sortedArr2 = [
		...arr2.sort((a, b) =>
			String(a[comparator]).localeCompare(String(b[comparator]))
		)
	]

	for (let i = 0; i < sortedArr1.length; i++) {
		if (sortedArr1[i][key] !== sortedArr2[i][key]) {
			return false
		}
	}

	return true
}
