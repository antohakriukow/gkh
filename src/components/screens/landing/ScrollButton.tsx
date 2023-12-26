import { FC } from 'react'
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'

import styles from './Landing.module.scss'

interface IScrollButton {
	scrollDirection: 'up' | 'down'
}

const ScrollButton: FC<IScrollButton> = ({ scrollDirection }) => {
	const handleScroll = () => {
		window.scrollTo({
			top:
				scrollDirection === 'down' ? document.documentElement.scrollHeight : 0,
			behavior: 'smooth'
		})
	}

	return scrollDirection === 'down' ? (
		<button className={styles.scroll} onClick={handleScroll}>
			<p>Далее</p>
			<FaChevronCircleDown size={30} />
		</button>
	) : (
		<button className={styles.scroll} onClick={handleScroll}>
			<FaChevronCircleUp size={30} />
			<p></p>
		</button>
	)
}
export default ScrollButton
