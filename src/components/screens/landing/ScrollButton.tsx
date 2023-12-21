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
	console.log(window.innerHeight)
	return scrollDirection === 'down' ? (
		<button className={styles.scroll} onClick={handleScroll}>
			<p>Зарегистрироваться</p>
			<p>за 30 секунд</p>
			<FaChevronCircleDown size={48} />
		</button>
	) : (
		<button className={styles.scroll} onClick={handleScroll}>
			<FaChevronCircleUp size={48} />
			<p>Наверх</p>
		</button>
	)
}
export default ScrollButton
