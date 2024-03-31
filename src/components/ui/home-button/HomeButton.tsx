import { FC } from 'react'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { useRedirect } from '~/hooks'

import style from './HomeButton.module.scss'

const HomeButton: FC = () => {
	const { navigateToHome } = useRedirect()

	return (
		<button className={style.button} onClick={navigateToHome}>
			<FaChevronCircleLeft size={32} />
			<p>На главную</p>
		</button>
	)
}
export default HomeButton
