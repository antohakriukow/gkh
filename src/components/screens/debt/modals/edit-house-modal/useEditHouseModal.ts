import { FirebaseError } from 'firebase/app'
import { useCallback, useMemo, useState } from 'react'
import { useAuth, useHousesData, useModal } from '~/hooks'

import { IHouse } from '~/shared/types/debts'

import { HouseService } from '~/services/house.service'

import { handleDBErrors } from '~/utils/error/utils'

export const useEditHouseModal = () => {
	const { user } = useAuth()
	const { hideModal } = useModal()
	const [isLoading, setIsLoading] = useState(false)
	const { houses } = useHousesData()

	const createHouse = useCallback(
		async (data: IHouse) => {
			if (!user) return
			if (houses.find(house => house.address === data.address)) return

			setIsLoading(true)
			const houseId = Date.now().toString()

			await HouseService.create(user.uid, data, houseId)

			try {
			} catch (error) {
				if (error instanceof FirebaseError) handleDBErrors(error)
			} finally {
				setIsLoading(false)
				hideModal()
			}
		},
		[user, houses]
	)

	return useMemo(
		() => ({
			isLoading,
			createHouse
		}),
		[isLoading, createHouse]
	)
}
