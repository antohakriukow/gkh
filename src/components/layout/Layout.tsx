import Header from './header/Header'
import { FC, PropsWithChildren } from 'react'

import { useData } from '~/hooks/useData'

import { Loader } from '../ui'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { isLoading } = useData()

	return (
		<>
			<div className={styles.layout}>
				{isLoading ? (
					<Loader loaderType='large' />
				) : (
					<>
						<Header />
						<div>{children}</div>
					</>
				)}
			</div>
		</>
	)
}

export default Layout
