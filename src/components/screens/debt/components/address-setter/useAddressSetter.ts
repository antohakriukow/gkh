import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useHousesData } from '~/hooks'

import { IAddress, IHouse } from '~/shared/types/debts/house.interface'

import { useDebt } from '../../useDebt'

export const useAddressSetter = () => {
	const { house, room, setHouse, setRoom } = useDebt()
	const { houses, isLoading: isHousesLoading } = useHousesData()

	const { register, control, watch, setValue } = useForm<IAddress>({
		mode: 'onChange'
	})
	const houseFieldData = watch('house')
	const roomFieldData = watch('room')

	const hasHouses = houses.length > 0

	const housesOptions = houses.map(house => ({
		label: house.address,
		value: JSON.stringify(house)
	}))

	useEffect(() => {
		if (houses.length === 1) {
			setValue('house', JSON.stringify(houses[0]) as unknown as IHouse)
		} else if (house) {
			setValue('house', JSON.stringify(house) as unknown as IHouse)
		}

		if (room) {
			setValue('room', room)
		}
	}, [houses, house, room, setValue])

	useEffect(() => {
		if (!roomFieldData || !houseFieldData) return
		setRoom(roomFieldData)
		setHouse(JSON.parse(houseFieldData as unknown as string))
	}, [setHouse, setRoom, houseFieldData, roomFieldData])

	return useMemo(
		() => ({
			isHousesLoading,
			hasHouses,
			housesOptions,
			control,
			register
		}),
		[isHousesLoading, hasHouses, housesOptions, control, register]
	)
}
