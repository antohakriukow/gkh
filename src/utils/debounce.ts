export function debounce<F extends (...args: any[]) => any>(
	func: F,
	delay: number
): (...args: Parameters<F>) => void {
	let timeoutId: NodeJS.Timeout | null = null

	return (...args: Parameters<F>) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => func(...args), delay)
	}
}
