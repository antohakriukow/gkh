import Navigation from './navigation/Navigation'
import { CombinedProvider } from './providers/CombinedProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<CombinedProvider>
					<Navigation />
				</CombinedProvider>
			</Provider>
		</div>
	)
}

export default App
