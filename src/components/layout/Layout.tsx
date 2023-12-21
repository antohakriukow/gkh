import Header from './header/Header'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'

import { Loader } from '../ui'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { isLoading } = useData()
	const { user } = useAuth()

	return (
		<>
			<div className={styles.layout}>
				{isLoading ? (
					<Loader loaderType='large' />
				) : (
					<>
						{!!user?.uid && <Header />}
						<div>{children}</div>
					</>
				)}
			</div>
		</>
	)
}

export default Layout
