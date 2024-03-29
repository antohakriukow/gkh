import ReportBody from './components/ReportBody'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '~/components/ui'

import { useWindowWidth } from '~/hooks/useWindowWidth'

import { Container, NarrowAttention } from '../shared'
import { useAnnualReport } from '../useAnnualReport'

const Preview: FC = () => {
	const {
		isDataLoading,
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		paymentButtonData,
		downloadXLSX
	} = useAnnualReport()
	const navigate = useNavigate()
	const { width } = useWindowWidth()
	const isNarrow = width < 500

	const isCashServicesStructure =
		annualReportInDB?.data?.settings?.structure === 'cash/services'

	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/debit-sorter`)

	const handleNext = () =>
		isReportPayed ? downloadXLSX() : paymentButtonData.onClick()

	if (isNarrow) return <NarrowAttention />

	return (
		<Container
			onBack={redirectToCategoriesSetter}
			onNext={handleNext}
			NextButtonText={
				isReportPayed ? 'Скачать отчет' : paymentButtonData.buttonTitle
			}
			hasNoBackButton={!isCashServicesStructure}
			isReportPayed={isReportPayed}
			handleCloseReport={closeAnnualReport}
			handleDeleteReport={deleteAnnualReport}
		>
			{isDataLoading ? (
				<Loader loaderType='fullscreen' />
			) : (
				<ReportBody annualReportInDB={annualReportInDB} />
			)}
		</Container>
	)
}

export default Preview
