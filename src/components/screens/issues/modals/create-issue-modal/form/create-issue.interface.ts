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

import { IIssue } from '~/shared/types/issue.interface'

export interface IIssueForm {
	register: UseFormRegister<IIssue>
	control: Control<IIssue>
	formState: FormState<IIssue>
	watch: UseFormWatch<IIssue>
	setValue: UseFormSetValue<IIssue>
	reset?: UseFormReset<IIssue>
}

export interface IIssueField {
	register: UseFormRegister<IIssue>
	control: Control<IIssue>
	placeholder?: string
	fieldName: string
	switcherName?: string
	formState?: FormState<IIssue>
	error?: FieldError
	isRequired?: boolean
}

export interface IIssueSelect {
	control: Control<IIssue>
	placeholder: string
	fieldName: string
	options: IOption[]
	isRequired?: boolean
}
