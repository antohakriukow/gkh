import {
	Control,
	FieldError,
	FormState,
	UseFormRegister,
	UseFormReset,
	UseFormSetValue,
	UseFormTrigger,
	UseFormWatch
} from 'react-hook-form'

import { IOption } from '~/components/ui/form-elements/form.interface'

import { IReport } from '~/shared/types/report.interface'

export interface IReportForm {
	register: UseFormRegister<IReport>
	control: Control<IReport>
	formState: FormState<IReport>
	watch: UseFormWatch<IReport>
	setValue: UseFormSetValue<IReport>
	reset?: UseFormReset<IReport>
	// trigger: UseFormTrigger<IReport>
	// handleSubmit: UseFormHandleSubmit<IReport, undefined>
	// onSubmit: (data: IReport) => Promise<void>
	// errors: FieldErrors<IReport>
}

// type PathImpl<T, Key extends keyof T> = Key extends string
// 	? T[Key] extends Record<string, any>
// 		? T[Key] extends ArrayLike<any>
// 			? Key
// 			: Key | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>>}`
// 		: Key
// 	: never

// type ReportFieldNames = PathImpl<IReport, keyof IReport>

export interface IReportField {
	register: UseFormRegister<IReport>
	control: Control<IReport>
	placeholder?: string
	fieldName: string
	switcherName?: string
	error?: FieldError
	isRequired?: boolean
}

export interface IReportFieldWithSwitch extends IReportField {
	watch: UseFormWatch<IReport>
	setValue: UseFormSetValue<IReport>
}

export interface IReportSelect {
	control: Control<IReport>
	placeholder: string
	fieldName: string
	options: IOption[]
}
