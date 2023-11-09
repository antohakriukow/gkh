import Navigation from './navigation/Navigation'
import { AuthProvider } from './providers/auth/AuthProvider'

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<Navigation />
			</AuthProvider>
		</div>
	)
}

export default App
