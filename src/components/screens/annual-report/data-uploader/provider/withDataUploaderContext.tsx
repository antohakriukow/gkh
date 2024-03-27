import { DataUploaderProvider } from './provider'
import { FC } from 'react'

const withDataUploaderContext = (WrappedComponent: FC) => {
	const WithDataUploaderContext = () => {
		return (
			<DataUploaderProvider>
				<WrappedComponent />
			</DataUploaderProvider>
		)
	}

	WithDataUploaderContext.displayName = `WithDataUploaderContext(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`

	return WithDataUploaderContext
}

export default withDataUploaderContext
