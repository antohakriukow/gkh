import Footer from './footer/Footer'
import Header from './header/Header'
import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '~/hooks'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user } = useAuth()

	return (
		<div className={styles.layout}>
			{!!user?.uid && <Header />}
			<Outlet />
			{!!user?.uid && <Footer />}
		</div>
	)
}

export default Layout
