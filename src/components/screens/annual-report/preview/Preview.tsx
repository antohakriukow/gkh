import AccrualsReport from './components/accruals-report/AccrualsReport'
import CashPartnersReport from './components/cash-partners-report/CashPartnersReport'
import CashServicesReport from './components/cash-services-report/CashServicesReport'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loader } from '~/components/ui'

import {
	IAnnualReport,
	TypeCategoriesMap
} from '~/shared/types/annual.interface'

import Container from '../shared/container/Container'
import { useAnnualReport } from '../useAnnualReport'

const Body: FC<{ annualReportInDB: IAnnualReport | null | undefined }> = ({
	annualReportInDB
}) => {
	if (!annualReportInDB || !annualReportInDB.data) return null

	if (
		!!annualReportInDB.data.bankOperations &&
		annualReportInDB.data.settings?.structure === 'cash/partners'
	) {
		return (
			<CashPartnersReport
				company={annualReportInDB.company}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	if (
		!!annualReportInDB.data.bankOperations &&
		annualReportInDB.data.settings?.structure === 'cash/services'
	) {
		return (
			<CashServicesReport
				categories={
					(annualReportInDB?.data.categories ?? []) as TypeCategoriesMap
				}
				company={annualReportInDB.company}
				operations={annualReportInDB?.data?.bankOperations}
			/>
		)
	}

	if (!!annualReportInDB?.data?.accountingOperations)
		return (
			<AccrualsReport
				operations={annualReportInDB?.data?.accountingOperations}
				accounts={annualReportInDB?.data?.accounts ?? []}
				company={annualReportInDB.company}
			/>
		)

	return <Loader />
}

const Preview: FC = () => {
	const {
		annualReportInDB,
		isReportPayed,
		closeAnnualReport,
		deleteAnnualReport,
		paymentButtonData,
		downloadXLSX
	} = useAnnualReport()
	const navigate = useNavigate()

	const isCashServicesStructure =
		annualReportInDB?.data.settings?.structure === 'cash/services'

	const redirectToCategoriesSetter = () =>
		navigate(`/annual-reports/edit/${annualReportInDB?._id}/debit-sorter`)

	const handleNext = () =>
		isReportPayed ? downloadXLSX() : paymentButtonData.onClick()

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
			{!!annualReportInDB ? (
				<Body annualReportInDB={annualReportInDB} />
			) : (
				<Loader loaderType='fullscreen' />
			)}
		</Container>
	)
}

export default Preview
