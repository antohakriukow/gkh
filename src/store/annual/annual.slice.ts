import { AnnualState } from './annual.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation
} from '~/shared/types/annual.interface'

const initialState: AnnualState = {
	operations: [],
	accounts: [],
	fileNames: [],
	startDate: undefined,
	finalDate: undefined
}

export const annualSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		clearOAnnualState: state => {
			state.operations = []
			state.accounts = []
			state.fileNames = []
		},
		setOperations: (
			state,
			action: PayloadAction<IAccountingOperation[] | IBankOperation[]>
		) => {
			state.operations = action.payload
		},
		setAccounts: (state, action: PayloadAction<IAccount[]>) => {
			state.accounts = action.payload
		},
		setStartDate: (state, action: PayloadAction<number>) => {
			state.startDate = action.payload
		},
		setFinalDate: (state, action: PayloadAction<number>) => {
			state.finalDate = action.payload
		},

		setFileNames: (state, action: PayloadAction<string[]>) => {
			state.fileNames = action.payload
		}
	}
})

export const {
	clearOAnnualState,
	setOperations,
	setAccounts,
	setFileNames,
	setStartDate,
	setFinalDate
} = annualSlice.actions
export const annualReducer = annualSlice.reducer
