import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { IAnnualCategoryState } from '~/shared/types/annual.interface'

import { createDeepCopy } from '~/utils/object.utils'

interface ITreeContext {
	items: IAnnualCategoryState[]
	setItems: Dispatch<SetStateAction<IAnnualCategoryState[]>>
	renameItem: (id: string, value: string) => void
	createItem: (value: string) => void
}

export const TreeContext = createContext<ITreeContext>({} as ITreeContext)

export const TreeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { categories } = useTypedSelector(state => state.annual)
	const { setAnnualCategories } = useActions()
	const [items, setItems] = useState<IAnnualCategoryState[]>(
		createDeepCopy(categories)
	)

	useEffect(() => {
		setAnnualCategories(createDeepCopy(items))
	}, [setAnnualCategories, items])

	const createItem = useCallback(
		(value: string) => {
			const maxId = items.reduce((max, category) => {
				const id = parseInt(category.id.toString(), 10)
				return id > max ? id : max
			}, 0)

			const newId = (maxId + 1).toString()

			setItems([
				...items,
				{
					id: +newId,
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
				if (item.id.toString() === id.toString()) {
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
