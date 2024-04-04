interface IInputObject {
	[key: number]: any
}

export function createDeepCopy(obj: any, visited = new Map()) {
	if (typeof obj !== 'object' || obj === null) {
		return obj
	}

	if (visited.has(obj)) {
		return visited.get(obj)
	}

	let copy: IInputObject
	if (Array.isArray(obj)) {
		copy = []
		visited.set(obj, copy)
		for (let i = 0; i < obj.length; i++) {
			copy[i] = createDeepCopy(obj[i], visited)
		}
	} else {
		copy = {}
		visited.set(obj, copy)
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				copy[key as any] = createDeepCopy(obj[key], visited)
			}
		}
	}

	return copy
}
