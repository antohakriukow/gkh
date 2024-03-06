import { FC } from 'react'
import { Hourglass, ProgressBar } from 'react-loader-spinner'

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
			case 'fullscreen':
				return 72
			default:
				return 48
		}
	}

	const size = loaderType ? getSize(loaderType) : 48

	if (loaderType === 'fullscreen')
		return (
			<div className={styles.container}>
				<div className={styles.loader}>
					{/* <ProgressBar
						height={size}
						width={size}
						ariaLabel='progress-bar-loading'
						wrapperStyle={{}}
						wrapperClass='progress-bar-wrapper'
						borderColor='#df4956'
						barColor='#23c3ab'
					/> */}
					<Hourglass
						visible={true}
						height='80'
						width='80'
						ariaLabel='hourglass-loading'
						wrapperStyle={{}}
						wrapperClass=''
						colors={['#23c3ab', '#df4956']}
					/>
				</div>
			</div>
		)

	return (
		<div className={styles.loader}>
			{/* <ProgressBar
				height={size}
				width={size}
				ariaLabel='progress-bar-loading'
				wrapperStyle={{}}
				wrapperClass='progress-bar-wrapper'
				borderColor='#df4956'
				barColor='#23c3ab'
			/> */}
			<Hourglass
				visible={true}
				height='80'
				width='80'
				ariaLabel='hourglass-loading'
				wrapperStyle={{}}
				wrapperClass=''
				colors={['#23c3ab', '#df4956']}
			/>
		</div>
	)
}
export default Loader
