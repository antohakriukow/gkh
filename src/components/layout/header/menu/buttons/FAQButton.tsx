import { FC } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'

import VideoModal from '~/components/screens/landing/modals/VideoModal'

import { useModal } from '~/hooks/useModal'

import styles from './buttons.module.scss'

const FAQButton: FC = () => {
	const { showModal } = useModal()
	const handlePress = () => showModal(<VideoModal />)

	return (
		<FaQuestionCircle
			onClick={handlePress}
			color='#df4956'
			size={20}
			className={styles.faq}
		/>
	)
}
export default FAQButton
