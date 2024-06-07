import { jurisdiction, tooltips } from './edit-house-modal.data'
import { useEditHouseModal } from './useEditHouseModal'
import { FC, Fragment } from 'react'
import { useForm } from 'react-hook-form'

import { FieldGroup, FieldText } from '~/components/shared'
import { Button, Loader } from '~/components/ui'

import { IHouse } from '~/shared/types/debts'

import styles from './EditHouseModal.module.scss'

const EditHouseModal: FC = () => {
	const { isLoading, createHouse } = useEditHouseModal()

	const { register, control, handleSubmit } = useForm<IHouse>({
		mode: 'onSubmit'
	})

	const BUTTON_TITLE = 'Сохранить'

	const onSubmit = (data: IHouse) => createHouse(data)

	return (
		<div className={styles.container}>
			{isLoading ? (
				<Loader loaderType='small' />
			) : (
				<Fragment>
					<FieldText<IHouse>
						register={register}
						control={control}
						fieldName='address'
						placeholder='Адрес дома'
						tooltip={tooltips.address}
					/>
					<FieldGroup isVisible>
						<FieldText<IHouse>
							register={register}
							control={control}
							fieldName='magistrate.courtName'
							placeholder='Название мирового суда'
							tooltip={tooltips.magistrate.courtName}
						/>
						<FieldText<IHouse>
							register={register}
							control={control}
							fieldName='magistrate.courtAddress'
							placeholder='Адрес мирового суда'
							tooltip={tooltips.magistrate.courtAddress}
						/>
					</FieldGroup>
					<FieldGroup isVisible>
						<FieldText<IHouse>
							register={register}
							control={control}
							fieldName='court.courtName'
							placeholder='Название суда'
							tooltip={tooltips.court.courtName}
						/>
						<FieldText<IHouse>
							register={register}
							control={control}
							fieldName='court.courtAddress'
							placeholder='Адрес суда'
							tooltip={tooltips.court.courtAddress}
						/>
					</FieldGroup>
					<p>
						{jurisdiction.hint}
						<a href={jurisdiction.link.url}>{jurisdiction.link.description}</a>
					</p>
					<Button
						onClick={handleSubmit(onSubmit)}
						title={BUTTON_TITLE}
						style={{ marginTop: 20 }}
					/>
				</Fragment>
			)}
		</div>
	)
}
export default EditHouseModal
