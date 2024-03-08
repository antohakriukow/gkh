import { FC } from 'react'

import styles from './VideoModal.module.scss'

const VideoModal: FC<{ link: string }> = ({ link }) => {
	return (
		<div className={styles.container}>
			<iframe
				width='100%'
				height='100%'
				src={link}
				title='YouTube video player'
				allow='autoplay; encrypted-media'
				allowFullScreen
			></iframe>
		</div>
	)
}
export default VideoModal
