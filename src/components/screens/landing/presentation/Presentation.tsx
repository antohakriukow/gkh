import Benefit from './Benefit'
import { benefitsData } from './benefits.data'
import { IBenefit } from './interface.presentation'
import { FC, useEffect, useState } from 'react'

import { Button } from '~/components/ui'

import { useModal } from '~/hooks/useModal'

import ScrollButton from '../ScrollButton'
import VideoModal from '../modals/VideoModal'

import styles from './Presentation.module.scss'

const Presentation: FC = () => {
	const { showModal } = useModal()
	const [width, setWidth] = useState(window.innerWidth)

	const handleShowVideo = () => showModal(<VideoModal />)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const isNarrow = width <= 800

	return (
		<div className={styles.container}>
			<div className={styles.presentation}>
				<h3 className={styles.heading}>Экспресс 22 -</h3>
				<p className={styles.description}>Ваш помощник в заполнении 22-ЖКХ.</p>
				<ul>
					{benefitsData.map((benefit: IBenefit) => (
						<Benefit
							title={benefit.title}
							subTitle={benefit.subTitle}
							key={benefit.key}
						/>
					))}
				</ul>
				<Button className={styles.button} onClick={handleShowVideo}>
					Смотреть видео
				</Button>
				{isNarrow && <ScrollButton scrollDirection='down' />}
			</div>
		</div>
	)
}
export default Presentation
