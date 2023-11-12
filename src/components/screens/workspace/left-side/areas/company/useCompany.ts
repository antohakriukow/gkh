import { useState } from 'react'

import { useActions } from '~/hooks/useActions'
import { useAuth } from '~/hooks/useAuth'
import { useData } from '~/hooks/useData'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { ICompany } from '~/shared/types/company.interface'

import { CompanyService } from '~/services/company.service'

export const useCompany = () => {
	const { user } = useAuth()
	const { companies, isLoading } = useData()

	const { currentCompany } = useTypedSelector(state => state.ui)
	const { setCurrentCompany } = useActions()

	const handleSetCurrentCompany = async (inn: number) => {
		const current = companies.find(company => company.inn === inn)
		if (!current) return
		await setCurrentCompany(current)
	}

	const companyIsAlreadyExists = (inn: string) =>
		companies.find(company => +company.inn === +inn)

	const create = async (data: ICompany) => {
		if (companyIsAlreadyExists(data.inn.toString())) return
		// setIsLoading(true)
		try {
			if (user) CompanyService.create(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			// setIsLoading(false)
		}
	}

	const update = async (data: ICompany) => {
		// setIsLoading(true)
		try {
			if (user) CompanyService.update(user.uid, data)
		} catch (error) {
			console.log(error)
		} finally {
			// setIsLoading(false)
		}
	}

	return {
		isLoading,
		companies,
		currentCompany,
		setCurrentCompany,
		handleSetCurrentCompany,
		companyIsAlreadyExists,
		create,
		update
	}
}
