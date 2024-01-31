import { IAnnualCategory } from '~/shared/types/annual.interface'

export interface IItem {
	_id: string
	title: string
	onDragStart: () => void
	onDragEnd: () => void
	onRemove?: (_id: string) => void
	onRename?: (_id: string, title: string) => void
}

export interface IList {
	data: IAnnualCategory[]
	onDragStart: () => void
	onDragEnd: () => void
	onRemove?: (_id: string) => void
	onRename?: (_id: string, title: string) => void
}

export interface IItemCreator {
	onCreate: (title: string) => void
}
