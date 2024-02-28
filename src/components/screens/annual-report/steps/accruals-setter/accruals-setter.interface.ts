import {
	Control,
	FieldError,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'

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
