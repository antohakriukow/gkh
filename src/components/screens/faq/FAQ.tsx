import Video from './components/Video'
import { tips, videos } from './data/faq.data'
import { useFAQ } from './useFAQ'
import { FC } from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'

import { Heading, Tip } from '~/components/ui'

import styles from './FAQ.module.scss'

const FAQ: FC = () => {
	const { INSTRUCTIONS, REPORT_FILLING_RULES, handleGoBack } = useFAQ()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Heading title={INSTRUCTIONS} className={styles.title} />
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
					<Video key={video.link} title={video.title} link={video.link} />
				))}

				<p className={styles.title}>{REPORT_FILLING_RULES}</p>
				{tips.map((tip, index) => (
					<Tip key={index} title={tip.title} text={tip.text} />
				))}
			</div>
		</div>
	)
}
export default FAQ
