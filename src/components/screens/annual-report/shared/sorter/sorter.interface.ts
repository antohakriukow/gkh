import { IAnnualOperationTagData } from '~/data/annual-tag-variations'

import {
	IAnnualCategory,
	IExtendedBankOperation,
	TypeAnnualOperationTag
} from '~/shared/types/annual.interface'

interface ISorterProps {
	operations: IExtendedBankOperation[]
	selectedOperations: string[]
	level?: number
	showSeparateModal: (operation: IExtendedBankOperation) => void
	toggleOperationSelection: (id: string) => void
}

export interface IOperationProps {
	operation: IExtendedBankOperation
	isChecked: boolean
	showSeparateButton?: (operation: IExtendedBankOperation) => boolean
	showSeparateModal: (operation: IExtendedBankOperation) => void
	toggleOperationSelection: (id: string) => void
}

export interface IOperationsGroupProps extends ISorterProps {
	partnerName: string
}

export interface ICategoryProps extends ISorterProps {
	category: IAnnualCategory
	handleSubmit: (categoryId: string) => void
}

export interface ITagProps extends ISorterProps {
	tag: IAnnualOperationTagData
	handleSubmit: (tag: TypeAnnualOperationTag) => void
}

export interface IToolbarProps {
	disabled: boolean
	onSubmit: () => void
}
