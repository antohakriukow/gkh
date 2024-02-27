import Item from './Item'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { getAnnualDirectionTitle } from '~/core/annual/shared'

import { Button, SubHeading } from '~/components/ui'

import { TypeDefinedAnnualDirection } from '~/shared/types/annual.interface'

import { formatNumber } from '~/utils/number.utils'

import { IAnnualReportCategoriesFormInput } from '../step-two.interface'
import { useStepTwo } from '../useStepTwo'

import styles from './StepTwo.module.scss'

const Accruals: FC<{ direction: TypeDefinedAnnualDirection }> = ({
	direction
}) => {
	const { register, setValue, control, handleSubmit } =
		useForm<IAnnualReportCategoriesFormInput>({
			mode: 'onSubmit'
		})
	const { annualReportInDB, onSubmit } = useStepTwo(
		setValue,
		handleSubmit,
		direction
	)

	if (!direction || !annualReportInDB?.data?.categories) return null

	const categories = annualReportInDB?.data?.categories[direction] ?? []

	if (!categories) return null

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.container}>
				<SubHeading
					title={`Введите суммы начислений по направлению "${getAnnualDirectionTitle(
						direction
					)}":`}
				/>
				{categories?.map(category => {
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
				<Button type='submit'>Сохранить</Button>
				{categories && (
					<p>
						Итого начислено:{' '}
						{formatNumber(
							categories.reduce(
								(sum, category) =>
									category.amount ? sum + category.amount : sum,
								0
							)
						)}
					</p>
				)}
			</div>
		</form>
	)
}
export default Accruals
