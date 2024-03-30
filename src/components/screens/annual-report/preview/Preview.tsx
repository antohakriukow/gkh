import ReportBody from './ReportBody'
import { ReportFooter, ReportHeader } from './shared'
import { usePreview } from './usePreview'
import { FC } from 'react'

import { Loader } from '~/components/ui'

import { Container, NarrowAttention } from '../shared'

const Preview: FC = () => {
	const {
		isDataLoading,
		isCashPartnersStructure,
		isNarrow,
		isReportPayed,
		annualReportInDB,
		paymentButtonData,
		closeAnnualReport,
		deleteAnnualReport,
		redirectToCategoriesSetter,
		handleNext
	} = usePreview()

	if (!annualReportInDB.company) return null

	if (isNarrow) return <NarrowAttention />

	return (
		<Container
			onBack={redirectToCategoriesSetter}
			onNext={handleNext}
			NextButtonText={
				isReportPayed ? 'Скачать отчет' : paymentButtonData.buttonTitle
			}
			hasNoBackButton={isCashPartnersStructure}
			isReportPayed={isReportPayed}
			handleCloseReport={closeAnnualReport}
			handleDeleteReport={deleteAnnualReport}
		>
			{isDataLoading ? (
				<Loader loaderType='fullscreen' />
			) : (
				<div>
					<ReportHeader company={annualReportInDB.company} />
					<ReportBody annualReportInDB={annualReportInDB} />
					<ReportFooter company={annualReportInDB.company} />
				</div>
			)}
		</Container>
	)
}

export default Preview
