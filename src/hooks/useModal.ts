import { useContext } from 'react'

import { CombinedContext } from '~/providers/CombinedProvider'

export const useModal = () => {
	const context = useContext(CombinedContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}
