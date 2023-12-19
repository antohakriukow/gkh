import Navigation from './navigation/Navigation'
import { CombinedProvider } from './providers/CombinedProvider'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<CombinedProvider>
					<Navigation />
				</CombinedProvider>
			</Provider>
			<ToastContainer />
		</div>
	)
}

export default App
