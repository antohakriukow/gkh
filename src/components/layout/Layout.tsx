import Header from './header/Header'
import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<Header />
				<div>{children}</div>
			</div>
		</>
	)
}

export default Layout
