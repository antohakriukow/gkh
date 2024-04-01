import {
	ButtonHTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes
} from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { Options } from 'react-select'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	title?: string
}

export interface IFieldProps {
	placeholder?: string
	error?: FieldError | undefined
	color?: 'danger' | 'success'
	isString?: boolean
	isNarrow?: boolean
}

export interface ICheckboxProps {
	placeholder?: string
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
type TypeCheckboxPropsField = InputHTMLAttributes<HTMLInputElement> &
	ICheckboxProps
type TypeTextareaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface IField extends TypeInputPropsField {}
export interface ICheckbox extends TypeCheckboxPropsField {}
export interface ITextarea extends TypeTextareaPropsField {}

export interface IUploadField extends TypeInputPropsField {
	handleFiles: (files: File[]) => Promise<void>
	fileNames: string[]
}

export interface IOption {
	label: string
	value: string | number | boolean | null
}

export interface ISelect extends IFieldProps {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	isRequired?: boolean
	width?: number
}
