import { AnnualState } from './annual.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

const initialState: AnnualState = {
	operations: [],
	categories: [],
	accounts: [],
	fileNames: [],
	startDate: undefined,
	finalDate: undefined,
	error: undefined
}

export const annualSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		clearAnnualState: state => {
			state.operations = []
			state.accounts = []
			state.fileNames = []
			state.startDate = undefined
			state.finalDate = undefined
			state.structure = undefined
		},
		setAnnualStructure: (
			state,
			action: PayloadAction<TypeAnnualReportStructure>
		) => {
			state.structure = action.payload
		},
		setAnnualOperations: (
			state,
			action: PayloadAction<IAccountingOperation[] | IBankOperation[]>
		) => {
			state.operations = action.payload
		},
		setAnnualAccounts: (state, action: PayloadAction<IAccount[]>) => {
			state.accounts = action.payload
		},
		setAnnualStartDate: (state, action: PayloadAction<string>) => {
			state.startDate = action.payload
		},
		setAnnualFinalDate: (state, action: PayloadAction<string>) => {
			state.finalDate = action.payload
		},
		setAnnualError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		},

		addAnnualCategory: (state, action: PayloadAction<string>) => {
			const maxId = state.categories.reduce((max, category) => {
				const id = parseInt(category._id, 10)
				return id > max ? id : max
			}, 0)

			const newId = (maxId + 1).toString()

			state.categories = [
				...state.categories,
				{
					_id: newId,
					title: action.payload
				}
			]
		},
		removeAnnualCategory: (state, action: PayloadAction<string>) => {
			state.categories = state.categories.filter(
				category => category._id !== action.payload
			)
		},
		addAnnualCategoryChild: (
			state,
			action: PayloadAction<{ parent: string; child: string }>
		) => {
			state.categories = state.categories.map(category => {
				if (category._id === action.payload.parent) {
					const children = category.children || []

					if (children.includes(action.payload.child)) {
						return category
					}

					return { ...category, children: [...children, action.payload.child] }
				}
				return category
			})
		},
		removeAnnualCategoryChild: (
			state,
			action: PayloadAction<{ parent: string; child: string }>
		) => {
			state.categories = state.categories.map(category => {
				if (category._id === action.payload.parent) {
					const updatedChildren =
						category.children?.filter(
							child => child !== action.payload.child
						) || []

					return { ...category, children: updatedChildren }
				}
				return category
			})
		},
		updateAnnualCategoryTitle: (
			state,
			action: PayloadAction<{ _id: string; title: string }>
		) => {
			state.categories = state.categories.map(category => {
				if (category._id === action.payload._id) {
					return { ...category, title: action.payload.title }
				}
				return category
			})
		},

		setAnnualFileNames: (state, action: PayloadAction<string[]>) => {
			state.fileNames = action.payload
		}
	}
})

export const {
	clearAnnualState,
	setAnnualStructure,
	setAnnualOperations,
	setAnnualAccounts,
	setAnnualFileNames,
	setAnnualStartDate,
	setAnnualFinalDate,
	setAnnualError,
	addAnnualCategory,
	removeAnnualCategory,
	addAnnualCategoryChild,
	removeAnnualCategoryChild,
	updateAnnualCategoryTitle
} = annualSlice.actions
export const annualReducer = annualSlice.reducer
