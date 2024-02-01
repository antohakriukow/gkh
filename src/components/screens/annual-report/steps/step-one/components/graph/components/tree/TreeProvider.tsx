import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react'

import { IAnnualCategoryState } from '~/shared/types/annual.interface'

interface ITreeContext {
	items: IAnnualCategoryState[]
	setItems: Dispatch<SetStateAction<IAnnualCategoryState[]>>
	renameItem: (id: string, value: string) => void
	createItem: (value: string) => void
}

export const TreeContext = createContext<ITreeContext>({} as ITreeContext)

export const TreeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [items, setItems] = useState<IAnnualCategoryState[]>([])

	const createItem = useCallback(
		(value: string) => {
			const maxId = items.reduce((max, category) => {
				const id = parseInt(category.id, 10)
				return id > max ? id : max
			}, 0)

			const newId = (maxId + 1).toString()

			setItems([
				...items,
				{
					id: newId,
					value,
					collapsed: false,
					children: []
				}
			])
		},
		[items]
	)

	const renameItem = useCallback((id: string, value: string) => {
		const recursivelyRename = (
			items: IAnnualCategoryState[],
			id: string,
			value: string
		): IAnnualCategoryState[] =>
			items.map(item => {
				if (item.id === id) {
					return { ...item, value }
				} else if (item.children) {
					return {
						...item,
						children: recursivelyRename(
							item.children as IAnnualCategoryState[],
							id,
							value
						)
					}
				}
				return item
			})

		setItems(currentItems => recursivelyRename(currentItems, id, value))
	}, [])

	const value = useMemo(
		() => ({
			items,
			setItems,
			renameItem,
			createItem
		}),
		[items, setItems, renameItem, createItem]
	)

	return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
}

export const useTreeContext = () => {
	const context = useContext(TreeContext)
	if (!context) {
		throw new Error('TreeContext must be used within a TreeProvider')
	}
	return context
}
