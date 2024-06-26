import {
	FieldErrors,
	FormState,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'

import { ICompany, ICompanyInn } from '~/shared/types/company.interface'

export interface IAddCompanyDetailsFormProps {
	register: UseFormRegister<ICompany>
	handleSubmit: UseFormHandleSubmit<ICompany, undefined>
	onSubmit: (data: ICompany) => Promise<void>
	errors: FieldErrors<ICompany>
	initialValues?: Partial<ICompany>
	setValue: UseFormSetValue<ICompany>
}

export interface IAddCompanyFormProps {
	register: UseFormRegister<ICompanyInn>
	handleSubmit: UseFormHandleSubmit<ICompanyInn, undefined>
	onSubmit: (data: ICompanyInn) => Promise<void>
	errors: FieldErrors<ICompanyInn>
	formState: FormState<ICompanyInn>
	watch: UseFormWatch<ICompanyInn>
}
