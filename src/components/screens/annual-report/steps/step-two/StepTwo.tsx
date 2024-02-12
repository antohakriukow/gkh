import Item from './components/Item'
import { IAnnualReportCategoriesFormInput } from './step-two.interface'
import { useStepTwo } from './useStepTwo'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button, SubHeading } from '~/components/ui'

import styles from './StepTwo.module.scss'

const StepTwo: FC = () => {
	const { register, setValue, control, handleSubmit } =
		useForm<IAnnualReportCategoriesFormInput>({
			mode: 'onSubmit'
		})
	const { annualReportInDB, onSubmit } = useStepTwo(setValue)

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.container}>
				<SubHeading title='Введите суммы начислений:' />
				{annualReportInDB?.data?.categories
					? annualReportInDB?.data?.categories
							.sort((a, b) => a.value.localeCompare(b.value))
							?.map(category => (
								<Item
									key={category.id}
									register={register}
									control={control}
									fieldName={`categories.${category.id}.amount`}
									placeholder={category.value}
								/>
							))
					: null}
				<Button type='submit'>Сохранить</Button>
			</div>
		</form>
	)
}
export default StepTwo
