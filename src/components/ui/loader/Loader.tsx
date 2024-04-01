import { TypeLoader } from './loader.types'
import { getLoaderSize } from './loader.utils'
import { FC } from 'react'
import { Hourglass } from 'react-loader-spinner'

import styles from './loader.module.scss'

const LoaderComponent: FC<{ size: number }> = ({ size }) => (
	<div className={styles.loader}>
		<Hourglass
			visible={true}
			height={size}
			width={size}
			ariaLabel='hourglass-loading'
			wrapperStyle={{}}
			wrapperClass=''
			colors={['#23c3ab', '#df4956']}
		/>
	</div>
)

const Loader: FC<{ loaderType?: TypeLoader }> = ({ loaderType }) => {
	const size = loaderType ? getLoaderSize(loaderType) : 24

	if (loaderType === 'fullscreen')
		return (
			<div className={styles.container}>
				<LoaderComponent size={size} />
			</div>
		)

	return <LoaderComponent size={size} />
}
export default Loader
