import Navigation from './navigation/Navigation'
import { AuthProvider } from './providers/auth/AuthProvider'
import { ModalProvider } from './providers/modalProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<AuthProvider>
					<ModalProvider>
						<Navigation />
					</ModalProvider>
				</AuthProvider>
			</Provider>
		</div>
	)
}

export default App
