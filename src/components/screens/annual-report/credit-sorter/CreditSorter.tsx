import { useCreditSorter } from './useCreditSorter'
import { FC, useCallback } from 'react'

import { Loader } from '~/components/ui'

import { IExtendedBankOperation } from '~/shared/types/annual.interface'

import { Container, NarrowAttention, SeparateModal, Tag } from '../shared'

import styles from './credit-sorter.module.scss'

const CreditSorter: FC = () => {
	const {
		isNarrow,
		isLoading,
		isDataLoading,
		isReportPayed,
		localOperations,
		selectedOperations,
		operationsWithoutTag,
		operationsWithTag,
		lastBankOperationId,
		tags,
		showModal,
		setLocalOperations,
		toggleOperationSelection,
		closeAnnualReport,
		deleteAnnualReport,
		handleSubmit,
		onNext,
		onBack
	} = useCreditSorter()

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
					<Tag
						tag={{ title: 'ЖКУ: Поступления от собственников', value: '' }}
						toggleOperationSelection={toggleOperationSelection}
						selectedOperations={selectedOperations}
						operations={operationsWithoutTag}
						handleSubmit={handleSubmit}
						showSeparateModal={showSeparateModal}
					/>
				</div>
				<div className={styles.rightSide}>
					{tags.map(tag => (
						<Tag
							key={tag.value}
							tag={tag}
							toggleOperationSelection={toggleOperationSelection}
							selectedOperations={selectedOperations}
							operations={operationsWithTag.filter(op => op.tag === tag.value)}
							handleSubmit={handleSubmit}
							showSeparateModal={showSeparateModal}
						/>
					))}
				</div>
			</div>
		</Container>
	)
}
export default CreditSorter
