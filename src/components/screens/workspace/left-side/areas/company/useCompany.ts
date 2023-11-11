import { useState } from 'react'

import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'

import { ICompany } from '~/shared/types/company.interface'

import { CompanyService } from '~/services/company.service'

export const useCompany = () => {
	const { user } = useAuth()
	const { companies } = useData()
	const [isLoading, setIsLoading] = useState(false)

	const companyIsAlreadyExists = (inn: string) =>
		companies.find(company => +company.inn === +inn)

	const create = async (data: ICompany) => {
		if (companyIsAlreadyExists(data.inn.toString())) setIsLoading(true)
		try {
			if (user) CompanyService.create(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, companyIsAlreadyExists, create }
}
