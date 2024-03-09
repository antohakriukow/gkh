import { FC, Fragment } from 'react'

import styles from '../FAQ.module.scss'

const Video: FC<{ title: string; link: string }> = ({ title, link }) => {
	return (
		<Fragment>
			<p className={styles.title}>{title}</p>
			<iframe
				className={styles.video}
				src={link}
				title='YouTube video player'
				frameBorder='0'
				allow='autoplay; encrypted-media'
				allowFullScreen
			></iframe>
		</Fragment>
	)
}
export default Video
