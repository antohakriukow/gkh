import dayjs from 'dayjs'
import { XmlElement, toXML } from 'jstoxml'

import { IReport } from '~/shared/types/report.interface'

import { getReportTitle, readReportSchema } from '~/utils/report.utils'
import { convertXmlAttributes } from '~/utils/string.utils'

const _prepareToXML = (report: IReport) => {
	if (!report.finalReport) return
	console.log('report.finalReport: ', report.finalReport)
	return {
		_name: 'report',
		_attrs: {
			code: '609226005004',
			form: '5',
			shifr: 'jx_22jkxj',
			year: report.year,
			period: `040${report.period}`,
			version: '21-11-2022',
			formatVersion: '1.3' //TODO: by converting to XML convert formatVersion to format-version
		},
		_content: {
			_name: 'title',
			_content: [
				...getReportTitle(report),
				{
					_name: 'sections',
					_content: [
						{
							_name: 'section',
							_attrs: { code: '1' },
							_content: readReportSchema(report.finalReport[1])
						},
						{
							_name: 'section',
							_attrs: { code: '2' },
							_content: readReportSchema(report.finalReport[2])
						},
						{
							_name: 'section',
							_attrs: { code: '3' },
							_content: readReportSchema(report.finalReport[3])
						},
						{
							_name: 'section',
							_attrs: { code: '4' },
							_content: readReportSchema(report.finalReport[4])
						}
					]
				}
			]
		}
	}
}

export const downloadXML = (report: IReport) => {
	const now = dayjs()
	const config = {
		header: false,
		indent: '    '
	}
	const XMLData = convertXmlAttributes(
		toXML(_prepareToXML(report) as XmlElement, config)
	)

	const blob = new Blob([XMLData], { type: 'application/xml' })

	const url = URL.createObjectURL(blob)

	const downloadLink = document.createElement('a')
	downloadLink.href = url
	downloadLink.download = `0609226_005_004_19278933_${report.year}_040${
		report.period
	}__${now.format('YYYYMMDD')}.xml`

	downloadLink.click()

	URL.revokeObjectURL(url)
}
