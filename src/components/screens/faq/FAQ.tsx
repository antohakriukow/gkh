import { tips } from './data/faq.data'
import Tip from './tip/Tip'
import { FC } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Heading } from '~/components/ui'

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
				<p className={styles.title}>Видеоинструкция</p>
				<iframe
					// width='100%'
					// height='100%'
					className={styles.video}
					src='https://www.youtube.com/embed/JGUO_0oV5AA'
					title='YouTube video player'
					frameBorder='0'
					allow='autoplay; encrypted-media'
					allowFullScreen
				></iframe>
				<p className={styles.title}>Правила заполнения</p>
				{tips.map((tip, index) => (
					<Tip key={index} title={tip.title} text={tip.text} />
				))}
			</div>
		</div>
	)
}
export default FAQ
