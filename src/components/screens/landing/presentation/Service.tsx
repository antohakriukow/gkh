import { IService } from './interface.presentation'
import { FC } from 'react'
import { FaYoutube } from 'react-icons/fa'
import { useModal } from '~/hooks'

import VideoModal from '../modals/VideoModal'

import styles from './Presentation.module.scss'

const Service: FC<IService> = ({ title, bullets, links }) => {
	const { showModal } = useModal()

	return (
		<li className={styles.service}>
			<p className={styles.title}>{title}</p>
			<div className={styles.bullets}>
				{bullets.map((bullet, index) => (
					<div key={index}>{bullet}</div>
				))}
				{links.map(({ url, title }) => (
					<div
						className={styles.youtube}
						onClick={() => showModal(<VideoModal link={url} />)}
					>
						<p>{`${title} -->`}</p>
						<FaYoutube size={22} color='#fc0d1b' />
					</div>
				))}
			</div>
		</li>
	)
}
export default Service
