import { useDebts } from './useDebts'
import cn from 'clsx'
import { FC } from 'react'
import { useModal } from '~/hooks'

import Introduction from '~/components/intro/Introduction'
import AddCompanyModal from '~/components/shared/add-company-modal/AddCompanyModal'
import { Button, Heading, Loader, Table } from '~/components/ui'

import styles from './Debts.module.scss'

const Debts: FC = () => {
	const {
		debtsDetails,
		companies,
		isCompaniesLoading,
		isDebtsLoading,
		convertDebtsData,
		handleCreateDebt,
		handleOpenDebt,
		ADD_COMPANY,
		CREATE_DEBT,
		DEBTS,
		tableTitles,
		tableColumnWidths
	} = useDebts()
	const { showModal } = useModal()

	const handleAddCompany = () => showModal(<AddCompanyModal />)

	if (isDebtsLoading || isCompaniesLoading) return <Loader loaderType='small' />

	return (
		<div className={cn(styles.container)}>
			<div className={styles.headingContainer}>
				<Heading title={DEBTS} className={styles.heading} />
			</div>
			{!!companies?.length ? (
				<Button title={CREATE_DEBT} onClick={handleCreateDebt} />
			) : (
				<Button title={ADD_COMPANY} onClick={handleAddCompany} />
			)}
			{!!debtsDetails?.length && (
				<Table
					titles={tableTitles}
					rows={convertDebtsData(debtsDetails)}
					columnWidths={tableColumnWidths}
					onClick={handleOpenDebt}
					height={90}
				/>
			)}
			<Introduction />
		</div>
	)
}
export default Debts
