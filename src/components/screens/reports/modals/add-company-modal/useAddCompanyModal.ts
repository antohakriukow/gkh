import { useState } from 'react'

import { useActions } from '~/hooks/useActions'
import { useCompany } from '~/hooks/useCompany'
import { useData } from '~/hooks/useData'
import { useModal } from '~/hooks/useModal'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { ICompany, ICompanyInn } from '~/shared/types/company.interface'

import { CompanyService } from '~/services/company.service'
import { DadataService } from '~/services/dadata.service'

export const useAddCompanyModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { userUid } = useData()
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
