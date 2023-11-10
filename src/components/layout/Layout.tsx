import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Header from './header/Header'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<Header />
				<div className={styles.center}>{children}</div>
			</div>
		</>
	)
}

export default Layout
