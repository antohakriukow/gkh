import { FC, useState } from 'react'

import { convertLineBreaksToHTML } from '~/utils/string.utils'

import styles from './Tip.module.scss'

interface ITip {
	title: string
	text: string
}

const Tip: FC<ITip> = ({ title, text }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const handleClick = () => setIsOpened(!isOpened)

	const formattedText = convertLineBreaksToHTML(text)

	return (
		<div className={styles.container} onClick={handleClick}>
			<div className={styles.title}>{title}</div>
			{isOpened && (
				<div
					className={styles.text}
					dangerouslySetInnerHTML={{ __html: formattedText }}
				></div>
			)}
		</div>
	)
}
export default Tip
