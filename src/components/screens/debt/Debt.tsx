import DebtForm from './components/debt-form/DebtForm'
import { useDebt } from './useDebt'
import { FC } from 'react'

import { Container } from '~/components/shared'
import { Loader } from '~/components/ui'

const Debt: FC = () => {
	const {
		isLoading,
		navigateToDebts,
		handleDeleteDebt,
		saveDebt,
		formMethods
	} = useDebt()

	const {
		formState: { isValid }
	} = formMethods

	if (isLoading) return <Loader />

	return (
		<Container
			title='Взыскание'
			handleClose={navigateToDebts}
			handleDelete={handleDeleteDebt}
			onNext={formMethods.handleSubmit(saveDebt)}
			nextButtonDisabled={!isValid}
			NextButtonText='Сформировать'
			hasNoBackButton
		>
			<DebtForm
				methods={formMethods}
				onSuccess={saveDebt}
				onError={errors => console.log(errors)}
			/>
		</Container>
	)
}

export default Debt
