import { FC, MouseEvent, ReactNode, useCallback, useEffect } from 'react'
import { MdClose } from 'react-icons/md'

import { useModal } from '~/hooks/useModal'

import styles from './Modal.module.scss'

type ModalProps = {
	component: ReactNode
}

const Modal: FC<ModalProps> = ({ component }) => {
	const { hideModal } = useModal()

	const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			hideModal()
		}
	}

	const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
	}

	const handleEscKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				hideModal()
			}
		},
		[hideModal]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey)

		return () => {
			document.removeEventListener('keydown', handleEscKey)
		}
	}, [handleEscKey])

	return (
		<div className={styles.overlay} onClick={handleOverlayClick}>
			<div className={styles.container} onClick={stopPropagation}>
				<MdClose
					className={styles.closeBtn}
					size={42}
					color={'white'}
					onClick={hideModal}
				/>
				<div className={styles.component}>{component}</div>
			</div>
		</div>
	)
}
export default Modal
