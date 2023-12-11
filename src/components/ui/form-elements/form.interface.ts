import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { Options } from 'react-select'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder?: string
	error?: FieldError | undefined
	color?: 'danger' | 'success'
	isString?: boolean
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}

export interface IOption {
	label: string
	value: string | number | boolean | null
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
}
