import {
	getReportCode,
	getReportForm,
	getReportTitle,
	getReportVersion
} from './utils'
import dayjs from 'dayjs'
import { XmlElement, toXML } from 'jstoxml'

import { IReport } from '~/shared/types/report.interface'

import { readReportSchema } from '~/utils/report/utils'
import { convertXmlAttributes } from '~/utils/string/utils'

const _prepareToXML = (report: IReport) => {
	if (!report.finalReport) return

	return {
		_name: 'report',
		_attrs: {
			code: getReportCode(report.year),
			form: getReportForm(report.year),
			shifr: 'jx_22jkxj',
			year: report.year,
			period: `040${report.period}`,
			version: getReportVersion(report.year),
			formatVersion: '1.3'
		},
		_content: [
			{
				_name: 'title',
				_content: getReportTitle(report)
			},
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

export const downloadXML = (report: IReport) => {
	const now = dayjs()
	const config = {
		header: '<?xml version="1.0" encoding="UTF-8"?>',
		indent: '    '
	}
	const XMLData = convertXmlAttributes(
		toXML(_prepareToXML(report) as XmlElement, config)
	)

	const blob = new Blob([XMLData], { type: 'application/xml' })

	const url = URL.createObjectURL(blob)

	const downloadLink = document.createElement('a')
	downloadLink.href = url
	downloadLink.download = `0609226_00${getReportForm(report.year)}_004_${
		report.company.okpo
	}_${report.year}_040${report.period}__${now.format('YYYYMMDD')}.xml`

	downloadLink.click()

	URL.revokeObjectURL(url)
}
