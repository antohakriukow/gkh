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

import {
	IAnnualCategoryState,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { createDeepCopy } from '~/utils/object.utils'

import { useAnnualReport } from '../../useAnnualReport'

interface ITreeContext {
	items: IAnnualCategoryState[]
	setItems: Dispatch<SetStateAction<IAnnualCategoryState[]>>
	renameItem: (id: string, value: string) => void
	createItem: (value: string) => void
}

interface ITreeProvider {
	direction: TypeAnnualDirection
	setAnnualCategories: Dispatch<SetStateAction<IAnnualCategoryState[]>>
}

export const TreeContext = createContext<ITreeContext>({} as ITreeContext)

export const TreeProvider: FC<PropsWithChildren<ITreeProvider>> = ({
	children,
	direction,
	setAnnualCategories
}) => {
	const { annualReportInDB } = useAnnualReport()
	const initialCategories =
		annualReportInDB?.data?.categories &&
		direction !== undefined &&
		direction !== ''
			? annualReportInDB.data.categories[direction]
			: []

	const [items, setItems] = useState<IAnnualCategoryState[]>(
		createDeepCopy(initialCategories)
	)

	useEffect(() => {
		setAnnualCategories(createDeepCopy(items))
	}, [setAnnualCategories, items])

	useEffect(() => {
		if (annualReportInDB?.data?.categories && direction) {
			const newInitialCategories = createDeepCopy(
				annualReportInDB.data.categories[direction] ?? []
			)
			setItems(newInitialCategories)
		}
	}, [annualReportInDB, direction])

	const createItem = useCallback(
		(value: string) => {
			// Функция для нахождения максимального ID
			const findMaxId = (
				categories: IAnnualCategoryState[],
				currentMax: number = 0
			): number => {
				return categories?.reduce((maxId, category) => {
					const maxInChildren = category.children
						? findMaxId(category.children as IAnnualCategoryState[], maxId)
						: maxId
					return Math.max(maxId, +category.id, maxInChildren)
				}, currentMax)
			}

			// Находим максимальный ID среди всех категорий и их подкатегорий
			const maxId = findMaxId(items)

			// Создаем новую категорию с уникальным ID
			const newCategory: IAnnualCategoryState = {
				id: String(maxId + 1),
				value,
				collapsed: false,
				children: []
			}

			// Обновляем состояние, добавляя новую категорию
			setItems(currentItems => [...currentItems, newCategory])
		},
		[items, setItems]
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
