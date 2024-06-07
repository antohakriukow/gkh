import { DebtProvider } from './provider'
import { FC } from 'react'

const withDebtContext = (WrappedComponent: FC) => {
	const WithDebtContext = () => {
		return (
			<DebtProvider>
				<WrappedComponent />
			</DebtProvider>
		)
	}

	WithDebtContext.displayName = `WithDebtContext(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`

	return WithDebtContext
}

export default withDebtContext
