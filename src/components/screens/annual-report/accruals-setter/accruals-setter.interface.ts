import {
	Control,
	FieldError,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'

import { TypeDefinedAnnualDirection } from '~/shared/types/annual.interface'

export interface IAnnualReportCategoriesFormInput {
	categories: Record<string, { amount: number }>
}

export interface IAnnualReportCategoriesForm {
	register: UseFormRegister<IAnnualReportCategoriesFormInput>
	control: Control<IAnnualReportCategoriesFormInput>
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>
}

export interface IAnnualReportCategoriesField {
	register: UseFormRegister<IAnnualReportCategoriesFormInput>
	control: Control<IAnnualReportCategoriesFormInput>
	placeholder?: string
	fieldName: string
	switcherName?: string
	error?: FieldError
	isRequired?: boolean
}

export interface IFormProps {
	direction: TypeDefinedAnnualDirection
	register: UseFormRegister<IAnnualReportCategoriesFormInput>
	control: Control<IAnnualReportCategoriesFormInput>
	setValue: UseFormSetValue<IAnnualReportCategoriesFormInput>
	handleSubmit: UseFormHandleSubmit<IAnnualReportCategoriesFormInput>
	onSubmit: SubmitHandler<IAnnualReportCategoriesFormInput>
}
