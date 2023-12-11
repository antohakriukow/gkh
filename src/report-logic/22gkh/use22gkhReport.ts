import { use22gkhSchema } from './use22gkhSchema'

import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IReport } from '~/shared/types/report.interface'

import { getReportTitle, readReportSchema } from '~/utils/report.utils'

export const use22gkhReport = () => {
	const { currentReport } = useTypedSelector(state => state.ui)
	const { schemaChapterOne, schemaChapterTwo, schemaChapterThree } =
		use22gkhSchema(currentReport as IReport)

	//prettier-ignore
	const generate22GkgReport = (data: IReport) => {

		console.log(
			'readReportSchema(schemaChapterThree): ',
			readReportSchema(schemaChapterThree)
		)
		
		return{
		_name: 'report',
		_attrs: {
			code: '609226005004',
			form: '5',
			shifr: 'jx_22jkxj',
			year: data.year,
			period: `040${data.period}`,
			version: '21-11-2022',
			formatVersion: '1.3' //TODO: by converting to XML convert formatVersion to format-version
		},
		_content: {
			_name: 'title',
			_content: [
				...getReportTitle(data),
				{
					_name: 'sections',
					_content: [
						{
							_name: 'section',
							_attrs: { code: '1' },
							_content: readReportSchema(schemaChapterOne)
						},
						{
							_name: 'section',
							_attrs: { code: '2' },
							_content: readReportSchema(schemaChapterTwo)
						},
						{
							_name: 'section',
							_attrs: { code: '3' },
							_content: readReportSchema(schemaChapterThree)
						},
						{
							_name: 'section',
							_attrs: { code: '4' },
							_content: {
								_name: 'data4'
							}
						}
					]
				}
			]
		}
	}}

	return { generate22GkgReport }
}
