import { FC } from 'react'

import styles from './VideoModal.module.scss'

const VideoModal: FC = () => {
	return (
		<div className={styles.container}>
			<iframe
				width='100%'
				height='100%'
				src='https://www.youtube.com/embed/JGUO_0oV5AA?autoplay=1'
				title='YouTube video player'
				frameBorder='0'
				allow='autoplay; encrypted-media'
				allowFullScreen
			></iframe>
		</div>
	)
}
export default VideoModal
