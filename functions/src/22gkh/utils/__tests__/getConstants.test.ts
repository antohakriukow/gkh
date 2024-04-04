import { IConstants } from '../../types'
import { getConstants } from '../getConstants'
import { getReportData } from '../getReport'
import { getConstantsExpected } from '../mocks/getConstants.expected'
import { report2023 } from '../mocks/report2023'

jest.mock('../getReport', () => ({
	getReportData: jest.fn()
}))

describe('getConstants Cloud Function', () => {
	const userId = 'testUserId'
	const reportId = 'testReportId'

	const reportMock = report2023
	let constants: IConstants

	beforeAll(async () => {
		;(getReportData as jest.Mock).mockResolvedValue(reportMock)
		constants = await getConstants(userId, reportId)
	})

	it('should return expected constants, ignoring functions', async () => {
		const resultWithoutFunctions = JSON.parse(JSON.stringify(constants))
		const expectedWithoutFunctions = JSON.parse(
			JSON.stringify(getConstantsExpected)
		)

		expect(resultWithoutFunctions).toEqual(expectedWithoutFunctions)
	})

	it('should contain expected functions', () => {
		expect(typeof constants.distributeElectricity).toBe('function')
		expect(typeof constants.distributeMaintenance).toBe('function')
		expect(typeof constants.typicalRow).toBe('function')
	})

	describe('Function tests within getConstants', () => {
		it('tests typicalRow function', () => {
			const testAccruals = 100
			const testPayments = 50
			const testArea = 200
			const expectedRow = {
				3: testAccruals,
				4: testPayments,
				5: 0,
				6: testAccruals,
				7: testAccruals,
				8: testArea
			}

			expect(
				constants.typicalRow(testAccruals, testPayments, testArea)
			).toEqual(expectedRow)
		})

		it('tests distributeMaintenance function', async () => {
			const userId = 'testUserId'
			const reportId = 'testReportId'
			const { distributeMaintenance } = await getConstants(userId, reportId)

			const resultWithElevator = distributeMaintenance(67) // 67 - условный номер строки отчета, когда лифт есть
			expect(resultWithElevator).toEqual({
				'3': 4264,
				'4': 4113,
				'5': 0,
				'6': 4264,
				'7': 4264,
				'8': 2597
			})

			const resultWithoutElevator = distributeMaintenance(68) // 68 - условный номер строки отчета, когда лифта нет
			expect(resultWithoutElevator).toEqual({})
		})

		it('tests distributeElectricity function', async () => {
			const userId = 'testUserId'
			const reportId = 'testReportId'
			const { distributeElectricity } = await getConstants(userId, reportId)

			const resultForGasStove = distributeElectricity(77) // 77 - условный номер строки отчета для газовой плиты
			expect(resultForGasStove).toEqual({})

			const resultForElectricStove = distributeElectricity(78) // 78 - условный номер строки отчета для электрической плиты
			expect(resultForElectricStove).toEqual({
				'3': 0,
				'4': 0,
				'5': 0,
				'6': 0,
				'7': 0,
				'8': 0
			})
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
	})
})
