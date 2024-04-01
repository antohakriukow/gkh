import { useState } from 'react'
import { useActions, useCompany, useModal, useTypedSelector } from '~/hooks'

import { ICompany, ICompanyInn } from '~/shared/types/company.interface'

import { DadataService } from '~/services/dadata.service'

export const useAddCompanyModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { setNewCompany } = useActions()
	const { newCompany } = useTypedSelector(state => state.ui)
	const { create, update, companyIsAlreadyExists } = useCompany()
	const { hideModal } = useModal()

	const handleGetCompanyData = async (data: ICompanyInn) => {
		setIsLoading(true)
		const result = await DadataService.getByInn(data.inn.toString())
		setNewCompany(result)
		setIsLoading(false)
	}

	const handleSetCompanyDetails = async (company: ICompany) => {
		setIsLoading(true)
		const data = { ...newCompany, ...company }
		companyIsAlreadyExists(data.inn.toString()) ? update(data) : create(data)
		setNewCompany(null)
		hideModal()
		setIsLoading(false)
	}

	return {
		isLoading,
		newCompany,
		handleGetCompanyData,
		handleSetCompanyDetails
	}
}
