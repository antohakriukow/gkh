import { TypeLoader } from './loader.types'

export const getLoaderSize = (type: TypeLoader) => {
	switch (type) {
		case 'small':
			return 24
		case 'medium':
			return 48
		case 'large':
			return 96
		default:
			return 48
	}
}
