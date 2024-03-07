import Footer from './footer/Footer'
import Header from './header/Header'
import { FC, Fragment, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth'

import { Loader } from '../ui'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user } = useAuth()

	return (
		<>
			<div className={styles.layout}>
				{user?.uid ? (
					<Fragment>
						<Header />
						<Outlet />
						<Footer />
					</Fragment>
				) : (
					<Loader loaderType='fullscreen' />
				)}
			</div>
		</>
	)
}

export default Layout
