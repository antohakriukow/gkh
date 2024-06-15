import DebtForm from './components/debt-form/DebtForm'
import { useDebt } from './useDebt'
import { FC } from 'react'

import { Container } from '~/components/shared'

const Debt: FC = () => {
	const { navigateToDebts, handleDeleteDebt, saveDebt, formMethods } = useDebt()

	const {
		formState: { isValid }
	} = formMethods

	return (
		<Container
			title='Взыскание'
			handleClose={navigateToDebts}
			handleDelete={handleDeleteDebt}
			onNext={formMethods.handleSubmit(saveDebt)}
			nextButtonDisabled={!isValid}
			NextButtonText='Сохранить'
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
