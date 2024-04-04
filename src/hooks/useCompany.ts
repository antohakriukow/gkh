import { useCompaniesData } from './firebase-hooks/useCompaniesData'
import { useAuth } from './useAuth'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { ICompany } from '~/shared/types/company.interface'

import { CompanyService } from '~/services/company.service'

import { handleDBErrors } from '~/utils/error/utils'

export const useCompany = () => {
	const { user } = useAuth()
	const { companies } = useCompaniesData()
	const [isLoading, setIsLoading] = useState(false)

	const companyIsAlreadyExists = (inn: string) =>
		companies.find(company => +company.inn === +inn)

	const create = async (data: ICompany) => {
		setIsLoading(true)
		if (companyIsAlreadyExists(data.inn.toString())) return
		try {
			if (user) CompanyService.create(user.uid, data)
			toast.info(`Добавлена компания: ${data.name.short}`, {
				autoClose: 3000
			})
		} catch (error: any) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	const update = async (data: ICompany) => {
		setIsLoading(true)
		try {
			if (user) CompanyService.update(user.uid, data)
			toast.info(`Обновлена информация о компании: ${data.name.short}`, {
				autoClose: 3000
			})
		} catch (error) {
			if (error instanceof FirebaseError) handleDBErrors(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSetCurrentCompany = (inn: number) => {
		if (user) CompanyService.updateCurrentCompanyInn(user.uid, inn.toString())
	}

	return {
		isLoading,
		create,
		update,
		companyIsAlreadyExists,
		handleSetCurrentCompany
	}
}
