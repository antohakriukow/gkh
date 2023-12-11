// @ts-ignore
import { convertXmlAttributes } from './string.utils'
import dayjs from 'dayjs'
import { XmlElement, toXML } from 'jstoxml'

import { IReport } from '~/shared/types/report.interface'

export const downloadXML = (report: IReport) => {
	const now = dayjs()
	const config = {
		header: false,
		indent: '    '
	}
	const XMLData = convertXmlAttributes(
		toXML(report.finalReport?.xml as XmlElement, config)
	)
	console.log(XMLData)

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
