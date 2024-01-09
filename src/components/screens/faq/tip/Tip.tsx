import { FC, useState } from 'react'

import styles from './Tip.module.scss'

interface ITip {
	title: string
	text: string
}

const Tip: FC<ITip> = ({ title, text }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const handleClick = () => setIsOpened(!isOpened)

	const formatTextWithLineBreaks = (text: string) => {
		return text.split('\n').map((item, key) => {
			return (
				<span key={key}>
					{item}
					<br />
				</span>
			)
		})
	}

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.title}>{title}</div>
			{isOpened && (
				<div className={styles.text}>{formatTextWithLineBreaks(text)}</div>
			)}
		</div>
	)
}
export default Tip
