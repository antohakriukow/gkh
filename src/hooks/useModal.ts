import { useContext } from 'react'

import { CombinedContext } from '~/providers/CombinedProvider'

export const useModal = () => {
	const context = useContext(CombinedContext)
	// const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}
