import { useAuth } from './useAuth'
import { useData } from './useData'
import { useState } from 'react'

import { ICompany } from '~/shared/types/company.interface'

import { CompanyService } from '~/services/company.service'

export const useCompany = () => {
	const { user } = useAuth()
	const { companies } = useData()
	const [isLoading, setIsLoading] = useState(false)

	const companyIsAlreadyExists = (inn: string) =>
		companies.find(company => +company.inn === +inn)

	const create = async (data: ICompany) => {
		setIsLoading(true)
		if (companyIsAlreadyExists(data.inn.toString())) return
		try {
			if (user) CompanyService.create(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const update = async (data: ICompany) => {
		setIsLoading(true)
		try {
			if (user) CompanyService.update(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		create,
		update,
		companyIsAlreadyExists
	}
}
