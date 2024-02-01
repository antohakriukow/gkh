import { AnnualState } from './annual.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IAccount,
	IAccountingOperation,
	IAnnualCategory,
	IAnnualCategoryState,
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

		setAnnualCategories: (
			state,
			action: PayloadAction<IAnnualCategoryState[]>
		) => {
			state.categories = action.payload
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

	setAnnualCategories
} = annualSlice.actions
export const annualReducer = annualSlice.reducer
