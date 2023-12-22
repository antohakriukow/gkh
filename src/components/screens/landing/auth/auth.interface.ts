import { InputHTMLAttributes } from 'react'

export interface IAuthInput {
	email: string
	password?: string
	passwordConfirm?: string
	agreements?: boolean
}

export interface ICheckboxProps {
	placeholder?: string
}
type TypeCheckboxPropsField = InputHTMLAttributes<HTMLInputElement> &
	ICheckboxProps

export interface ICheckbox extends TypeCheckboxPropsField {}
