import Video from './components/Video'
import { tips, videos } from './data/faq.data'
import { FC } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Heading, Tip } from '~/components/ui'

import styles from './FAQ.module.scss'

const FAQ: FC = () => {
	const navigate = useNavigate()

	const handleGoBack = () => {
		navigate('/reports')
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Heading title='Инструкции' className={styles.title} />
				<div className={styles.tools}>
					<AiOutlineCloseSquare
						className={styles.close}
						onClick={handleGoBack}
						color='#e25a66'
						size={40}
					/>
				</div>
			</div>
			<div className={styles.faq}>
				{videos.map(video => (
					<Video title={video.title} link={video.link} />
				))}

				<p className={styles.title}>Правила заполнения 22-ЖКХ</p>
				{tips.map((tip, index) => (
					<Tip key={index} title={tip.title} text={tip.text} />
				))}
			</div>
		</div>
	)
}
export default FAQ
