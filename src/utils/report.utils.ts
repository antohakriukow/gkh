import { TypeReport } from '~/shared/types/report.interface'

export const convertTypeReport = (type: TypeReport) =>
	type === '22gkh' ? '22-ЖКХ' : 'ОИС'
