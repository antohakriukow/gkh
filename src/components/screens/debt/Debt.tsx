import AddressSetter from './components/address-setter/AddressSetter'
import DebtorSetter from './components/debtor-setter/DebtorSetter'
import { STEP_TITLE } from './debt.data'
import { IStep } from './debt.interface'
import withDebtContext from './provider/withDebtContext'
import { useDebt } from './useDebt'
import { FC } from 'react'

import { Container, StepStatus } from '~/components/shared'
import { Loader } from '~/components/ui'

const Debt: FC = () => {
	const {
		isLoading,
		step,
		navigateToDebts,
		handleDeleteDebt,
		setStep,
		handleNext,
		handleBack,
		stepOneDone
	} = useDebt()

	const steps = [
		{
			id: 1,
			title: STEP_TITLE.ONE,
			component: <AddressSetter />,
			isDone: stepOneDone
		},
		{
			id: 2,
			title: STEP_TITLE.TWO,
			component: <DebtorSetter />,
			isDone: false
		}
	] as IStep[]

	return (
		<Container
			title='Взыскание'
			handleClose={navigateToDebts}
			handleDelete={handleDeleteDebt}
			onNext={handleNext}
			onBack={handleBack}
			hasNoBackButton={step === 1}
		>
			<>
				{steps.map(({ id, title, component, isDone, color }) =>
					step === id ? (
						<StepStatus key={id} title={title} color={color}>
							{component}
						</StepStatus>
					) : (
						id < step &&
						isDone && (
							<StepStatus
								key={id}
								title={title}
								isDone={isDone}
								onClick={() => setStep(id)}
							/>
						)
					)
				)}
				{isLoading && <Loader loaderType='fullscreen' />}
			</>
		</Container>
	)
}
export default withDebtContext(Debt)
