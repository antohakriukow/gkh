import {
	Control,
	FieldError,
	FieldValues,
	FormState,
	UseFormRegister,
	UseFormReset,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form'

import { IOption } from '~/components/ui/form-elements/form.interface'

export interface IForm<T extends FieldValues> {
	register: UseFormRegister<T>
	control: Control<T>
	formState: FormState<T>
	watch: UseFormWatch<T>
	setValue: UseFormSetValue<T>
	reset?: UseFormReset<T>
}

export interface IField<T extends FieldValues> {
	register: UseFormRegister<T>
	control: Control<T>
	placeholder?: string
	fieldName: string
	switcherName?: string
	formState?: FormState<T>
	error?: FieldError
	isRequired?: boolean
	tooltip?: string
}

export interface IFieldWithSwitch<T extends FieldValues> extends IField<T> {
	watch: UseFormWatch<T>
	setValue: UseFormSetValue<T>
	showInput?: boolean
}

export interface ISelect<T extends FieldValues> {
	control: Control<T>
	placeholder: string
	fieldName: string
	options: IOption[]
	isRequired?: boolean
	tooltip?: string
}
