import React, { ReactNode, createContext, useCallback, useState } from 'react'

import Modal from '~/components/ui/modal/Modal'

import { useActions } from '~/hooks/useActions'

export interface IModalContext {
	component: ReactNode | null
	showModal: (component: ReactNode | null) => void
	hideModal: () => void
}

export const ModalContext = createContext<IModalContext | undefined>(undefined)

type ModalProviderProps = {
	children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [component, setComponent] = useState<ReactNode | null>(null)
	const { clearUI } = useActions()

	const showModal = useCallback((component: ReactNode | null) => {
		setComponent(component)
		setIsOpen(true)
	}, [])

	const hideModal = useCallback(() => {
		setIsOpen(false)
		setComponent(null)
		clearUI()
	}, [clearUI])

	return (
		<ModalContext.Provider value={{ component, showModal, hideModal }}>
			{children}
			{isOpen && <Modal component={component} />}
		</ModalContext.Provider>
	)
}
