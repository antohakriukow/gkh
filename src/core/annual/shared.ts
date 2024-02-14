import {
	IAccountingOperation,
	IAnnualCategory,
	IAnnualCategoryState,
	IBankOperation,
	IExtendedAccountingOperation,
	IExtendedBankOperation,
	TypeAnnualDirection
} from '~/shared/types/annual.interface'

import { AnnualState } from '~/store/annual/annual.interface'

/**
 * Проверяет, является ли переданная операция бухгалтерской операцией.
 *
 * @param operation - операция для проверки, которая может быть как бухгалтерской, так и банковской.
 * @returns Возвращает true, если операция является бухгалтерской (имеет свойство debitAccount), иначе false.
 */
export const isAccountingOperation = (
	operation: IAccountingOperation | IBankOperation
): operation is IAccountingOperation => {
	return (operation as IAccountingOperation).debitAccount !== undefined
}

/**
 * Проверяет, является ли переданная операция банковской операцией.
 *
 * @param operation - операция для проверки, которая может быть как бухгалтерской, так и банковской.
 * @returns Возвращает true, если операция является банковской (имеет свойство paymentPurpose), иначе false.
 */
export const isBankOperation = (
	operation: IAccountingOperation | IBankOperation
): operation is IBankOperation => {
	return (operation as IBankOperation).paymentPurpose !== undefined
}

export const isExtendedBankOperation = (
	operation: IExtendedAccountingOperation | IExtendedBankOperation
): operation is IExtendedBankOperation => {
	return (operation as IExtendedBankOperation).paymentPurpose !== undefined
}

/**
 * Возвращает массив номеров счетов для заданного направления.
 *
 * @param state - текущее состояние, содержащее информацию о счетах.
 * @param direction - направление, для которого необходимо получить номера счетов.
 * @returns Массив строк, представляющих номера счетов, соответствующих заданному направлению.
 */
export const getDirectionAccountNumbers = (
	state: AnnualState,
	direction: TypeAnnualDirection
): string[] => {
	if (!state.accounts) return []
	return state.accounts
		.filter(account => account.type === direction)
		.map(account => account.number)
}

/**
 * Рекурсивно удаляет свойство collapsed из категорий и подкатегорий.
 *
 * @param categories - массив категорий с возможным свойством collapsed и вложенными подкатегориями.
 * @returns Массив категорий IAnnualCategory, где из каждой категории и её подкатегорий удалено свойство collapsed.
 */
export const removeCollapsedFromCategories = (
	categories: IAnnualCategoryState[]
): IAnnualCategory[] => {
	return categories.map(({ collapsed, children, ...rest }) => ({
		...rest,
		...(children
			? {
					children: removeCollapsedFromCategories(
						children as IAnnualCategoryState[]
					)
			  }
			: {})
	}))
}

export const getAnnualDirectionTitle = (direction: TypeAnnualDirection) => {
	switch (direction) {
		case 'main':
			return 'ЖКУ'
		case 'renovation':
			return 'Капитальный ремонт'
		case 'commerce':
			return 'Коммерческая деятельность'
		case 'target':
			return 'Целевые взносы'
		default:
			return ''
	}
}
