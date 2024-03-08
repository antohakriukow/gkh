import { IService } from './interface.presentation'
import { FC } from 'react'
import { FaYoutube } from 'react-icons/fa'

import { useModal } from '~/hooks/useModal'

import VideoModal from '../modals/VideoModal'

import styles from './Presentation.module.scss'

const Service: FC<IService> = ({ title, bullets, link }) => {
	const { showModal } = useModal()
	const handleShowVideo = () => showModal(<VideoModal link={link} />)
	return (
		<li className={styles.service}>
			<p className={styles.title}>{title}</p>
			<div className={styles.bullets}>
				{bullets.map((bullet, index) => (
					<div key={index}>{bullet}</div>
				))}
				<div className={styles.youtube} onClick={handleShowVideo}>
					<p>{'Смотреть видео -->'}</p>
					<FaYoutube size={22} color='#fc0d1b' />
				</div>
			</div>
		</li>
	)
}
export default Service
