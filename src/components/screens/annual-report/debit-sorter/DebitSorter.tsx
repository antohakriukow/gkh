import { useDebitSorter } from './useDebitSorter'
import { FC, memo, useCallback } from 'react'

import { Loader } from '~/components/ui'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { getOperationsByCategory } from '~/utils/annual/utils'

import { Category, Container, NarrowAttention, SeparateModal } from '../shared'

import styles from './debit-sorter.module.scss'

const DebitSorter: FC = memo(() => {
	const {
		isLoading,
		isDataLoading,
		isNarrow,
		isReportPayed,
		annualReportInDB,
		localOperations,
		selectedOperations,
		sortedOperations,
		unsortedOperations,
		lastBankOperationId,
		mockUnsortedCategory,
		setLocalOperations,
		toggleOperationSelection,
		showModal,
		closeAnnualReport,
		deleteAnnualReport,
		onNext,
		onBack,
		handleSubmit
	} = useDebitSorter()

	const showSeparateModal = useCallback(
		(operation: IExtendedBankOperation) => {
			showModal(
				<SeparateModal
					operation={operation}
					lastBankOperationId={lastBankOperationId}
					clearSelectedOperation={() => toggleOperationSelection(operation._id)}
					localOperations={localOperations}
					setLocalOperations={setLocalOperations}
				/>
			)
		},
		[
			lastBankOperationId,
			showModal,
			toggleOperationSelection,
			localOperations,
			setLocalOperations
		]
	)

	if (isNarrow) return <NarrowAttention />

	if (isLoading || isDataLoading)
		return (
			<Container
				isReportPayed={isReportPayed}
				handleCloseReport={closeAnnualReport}
				handleDeleteReport={deleteAnnualReport}
			>
				<Loader loaderType='fullscreen' />
			</Container>
		)

	return (
		<Container
			onNext={onNext}
			onBack={onBack}
			isReportPayed={isReportPayed}
			handleCloseReport={closeAnnualReport}
			handleDeleteReport={deleteAnnualReport}
		>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<Category
						category={mockUnsortedCategory}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						operations={unsortedOperations}
						handleSubmit={handleSubmit}
						showSeparateModal={showSeparateModal}
					/>
				</div>
				<div className={styles.rightSide}>
					{annualReportInDB?.data?.categories?.main?.map(category => (
						<Category
							key={category.id}
							category={category}
							operations={getOperationsByCategory(sortedOperations, category)}
							toggleOperationSelection={toggleOperationSelection}
							selectedOperations={selectedOperations}
							handleSubmit={handleSubmit}
							showSeparateModal={showSeparateModal}
						/>
					))}
				</div>
			</div>
		</Container>
	)
})
export default DebitSorter
