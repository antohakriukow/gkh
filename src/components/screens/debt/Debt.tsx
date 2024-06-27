import DebtForm from './components/debt-form/DebtForm'
import PrintDocsModal from './modals/print-docs-modal/PrintDocsModal'
import { useDebt } from './useDebt'
import { FC, useCallback } from 'react'
import { useModal } from '~/hooks'

import { Container } from '~/components/shared'
import { Loader } from '~/components/ui'

import { IDebt } from '~/shared/types/debts/debt.interface'

const Debt: FC = () => {
	const { showModal } = useModal()
	const {
		isLoading,
		debt,
		navigateToDebts,
		handleDeleteDebt,
		saveDebt,
		formMethods
	} = useDebt()

	const {
		formState: { isValid, isDirty }
	} = formMethods

	const printDocs = (debt: IDebt) => {
		showModal(<PrintDocsModal debt={debt} />)
	}

	const handleNext = async (data: IDebt) => {
		const updatedDebt = isDirty ? await saveDebt(data) : debt
		if (updatedDebt) {
			printDocs(updatedDebt)
		}
	}

	if (isLoading) return <Loader />

	return (
		<Container
			title='Взыскание'
			handleClose={navigateToDebts}
			handleDelete={handleDeleteDebt}
			onNext={formMethods.handleSubmit(handleNext)}
			nextButtonDisabled={!isValid}
			NextButtonText='Скачать'
			hasNoBackButton
		>
			<DebtForm
				methods={formMethods}
				onSuccess={saveDebt}
				onError={errors => {}}
			/>
		</Container>
	)
}

export default Debt
