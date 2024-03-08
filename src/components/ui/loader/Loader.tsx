import { FC } from 'react'
import { Hourglass } from 'react-loader-spinner'

import styles from './Loader.module.scss'

type TypeLoader = 'small' | 'medium' | 'large' | 'fullscreen'

const Loader: FC<{ loaderType?: TypeLoader }> = ({ loaderType }) => {
	const getSize = (type: TypeLoader) => {
		switch (type) {
			case 'small':
				return 24
			case 'medium':
				return 48
			case 'large':
				return 96
			default:
				return 48
		}
	}

	const size = loaderType ? getSize(loaderType) : 24

	if (loaderType === 'fullscreen')
		return (
			<div className={styles.container}>
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
					{/* <p>Пожалуйста, подождите...</p> */}
				</div>
			</div>
		)

	return (
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
}
export default Loader
