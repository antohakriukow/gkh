import { useEffect } from 'react'

export const useEnterKey = (handleEnter: () => void) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				event.stopPropagation()
				handleEnter()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleEnter])
}
