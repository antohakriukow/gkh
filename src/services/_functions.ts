import {
	addShortIdToUserCF,
	checkReportCF,
	createLogCF,
	generateFinalReportCF,
	getCompanyByInnCF
} from './_firebase'

import {
	ILogDTO,
	TypeLogCode,
	TypeLogLevel
} from '~/shared/types/log.interface'

export const cloudFunction = {
	async addShortIdToUser() {
		await addShortIdToUserCF()
	},

	async getCompanyByInn(inn: string) {
		const response = await getCompanyByInnCF({ inn })
		return response
	},

	async checkReport(reportId: string) {
		const response = await checkReportCF({ reportId })
		return response
	},

	async generateFinalReport(reportId: string) {
		const response = await generateFinalReportCF({ reportId })
		return response
	},

	async createLog(
		userId: string,
		level: TypeLogLevel,
		code: TypeLogCode,
		data?: Object
	) {
		createLogCF({
			user: { id: userId },
			level,
			code,
			data: data ? data : null
		} as ILogDTO)
	}
}
