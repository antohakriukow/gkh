import Item from './Item'
import { FC } from 'react'
import { Control, UseFormRegister } from 'react-hook-form'

import { SubHeading } from '~/components/ui'

import {
	TypeCategoriesMap,
	TypeDefinedAnnualDirection
} from '~/shared/types/annual.interface'

import { getAnnualDirectionTitle } from '~/utils/annual/utils'

import { IAnnualReportCategoriesFormInput } from '../accruals-setter.interface'

import styles from './accruals.module.scss'

interface IFormProps {
	direction: TypeDefinedAnnualDirection
	register: UseFormRegister<IAnnualReportCategoriesFormInput>
	control: Control<IAnnualReportCategoriesFormInput>
	categoriesInDb: TypeCategoriesMap | undefined
}

const Form: FC<IFormProps> = ({
	direction,
	register,
	control,
	categoriesInDb
}) => {
	if (!direction || !categoriesInDb) return null

	const categories = categoriesInDb[direction] ?? []

	if (!categories) return null

	return (
		<div className={styles.container}>
			<SubHeading
				title={`Введите суммы начислений по направлению "${getAnnualDirectionTitle(
					direction
				)}":`}
			/>
			{categories.map(category => {
				const placeholder =
					direction === 'main'
						? `${category.value}, руб:`
						: `Счет №${category.value}`
				return (
					<Item
						key={category.id}
						register={register}
						control={control}
						fieldName={`categories.${category.id}.amount`}
						placeholder={placeholder}
					/>
				)
			})}
		</div>
	)
}
export default Form
