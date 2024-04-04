import {
	IServices,
	ISettings
} from '../../../../../src/shared/types/report22gkh.interface'
import { generateServicesArea } from '../utils'

describe('generateServicesArea', () => {
	const defaultArea = 100

	it('should use default area for services without specified area', () => {
		const settings: ISettings = {
			housesCount: 'one',
			services: {
				coldWater: { status: true, area: 50 },
				electricity: { status: true }
			} as IServices
		}
		const expected = {
			coldWater: 50,
			electricity: defaultArea
		}
		expect(generateServicesArea(settings, defaultArea)).toEqual(expected)
	})

	it('should return empty object if services are not defined', () => {
		const settings: ISettings = {
			housesCount: 'one'
		}
		const expected = {}
		expect(generateServicesArea(settings, defaultArea)).toEqual(expected)
	})

	it('should apply default area to all services if services area is not specified', () => {
		const settings: ISettings = {
			housesCount: 'one',
			services: {
				coldWater: { status: true, area: 100 },
				heat: { status: true, area: 100 },
				electricity: { status: true, area: 100 }
			} as IServices
		}
		const expected = {
			coldWater: defaultArea,
			heat: defaultArea,
			electricity: defaultArea
		}
		expect(generateServicesArea(settings, defaultArea)).toEqual(expected)
	})

	it('should handle combination of services with and without specified area', () => {
		const settings: ISettings = {
			housesCount: 'one',
			areasAreDifferent: 'yes',
			services: {
				coldWater: { status: true, area: 70 },
				heat: { status: true },
				electricity: { status: true, area: 50 }
			} as IServices
		}
		const expected = {
			coldWater: 70,
			heat: defaultArea,
			electricity: 50
		}
		expect(generateServicesArea(settings, defaultArea)).toEqual(expected)
	})
})
