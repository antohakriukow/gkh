import { useAddressSetter } from './useAddressSetter'
import { FC } from 'react'
import { useModal } from '~/hooks'

import { FieldText, Select } from '~/components/shared'
import { Button, Loader } from '~/components/ui'

import { IAddress } from '~/shared/types/debts/house.interface'

import EditHouseModal from '../../modals/edit-house-modal/EditHouseModal'

import styles from './AddressSetter.module.scss'

const AddressSetter: FC = () => {
	const { isHousesLoading, hasHouses, housesOptions, control, register } =
		useAddressSetter()
	const { showModal } = useModal()

	const handleAddHouse = () => showModal(<EditHouseModal />)

	if (isHousesLoading) return <Loader />

	return (
		<div className={styles.container}>
			<div className={styles.house}>
				{hasHouses && (
					<Select<IAddress>
						options={housesOptions}
						placeholder='Адрес дома'
						control={control}
						fieldName='house'
					/>
				)}
				<Button onClick={handleAddHouse} title='Добавить дом' />
			</div>
			<FieldText<IAddress>
				register={register}
				control={control}
				fieldName='room'
				placeholder='Помещение'
				tooltip='Например: кв. 102 или пом. 12Н'
			/>
		</div>
	)
}
export default AddressSetter
