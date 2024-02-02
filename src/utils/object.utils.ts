export const createDeepCopy = (obj: any): any => {
	if (typeof obj !== 'object' || obj === null) {
		return obj
	}

	let copy: any

	if (Array.isArray(obj)) {
		copy = []
		for (let i = 0; i < obj.length; i++) {
			copy[i] = createDeepCopy(obj[i])
		}
	} else {
		copy = {} as Record<string, any>
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				copy[key] = createDeepCopy(obj[key])
			}
		}
	}

	return copy
}
