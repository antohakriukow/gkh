import {
	Control,
	FieldError,
	FormState,
	UseFormRegister,
	UseFormReset,
	UseFormSetValue,
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
}

export interface IReportField {
	register: UseFormRegister<IReport>
	control: Control<IReport>
	placeholder?: string
	fieldName: string
	switcherName?: string
	formState?: FormState<IReport>
	error?: FieldError
	isRequired?: boolean
	tooltip?: string
}

export interface IReportFieldWithSwitch extends IReportField {
	watch: UseFormWatch<IReport>
	setValue: UseFormSetValue<IReport>
	showInput?: boolean
}

export interface IReportSelect {
	control: Control<IReport>
	placeholder: string
	fieldName: string
	options: IOption[]
	isRequired?: boolean
	tooltip?: string
}
