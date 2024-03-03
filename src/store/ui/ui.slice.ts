import { IuiState } from './ui.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IAnnualReport,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'
import { ICompany } from '~/shared/types/company.interface'
import { IReport } from '~/shared/types/report.interface'

const initialState: IuiState = {
	currentCompany: null,
	currentReport: null,
	currentAnnualReport: null,
	annualReportInitialDataSavedToDb: false,
	isLoading: false,
	bankOperations: [],

	newCompany: null
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		clearUI: state => {
			state.newCompany = null
		},
		setCurrentCompany: (state, action: PayloadAction<ICompany | null>) => {
			state.currentReport = null
			state.currentCompany = action.payload
		},
		setCurrentReport: (state, action: PayloadAction<IReport | null>) => {
			state.currentReport = action.payload
		},
		setCurrentAnnualReport: (
			state,
			action: PayloadAction<IAnnualReport | null>
		) => {
			state.currentAnnualReport = action.payload
		},
		setNewCompany: (state, action: PayloadAction<ICompany | null>) => {
			state.currentReport = null
			state.newCompany = action.payload
		},
		setAnnualReportInitialDataSavedToDb: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.annualReportInitialDataSavedToDb = action.payload
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setBankOperations: (
			state,
			action: PayloadAction<IExtendedBankOperation[]>
		) => {
			state.bankOperations = action.payload
		}
	}
})

export const {
	clearUI,
	setCurrentCompany,
	setCurrentReport,
	setCurrentAnnualReport,
	setNewCompany,
	setAnnualReportInitialDataSavedToDb,
	setIsLoading,
	setBankOperations
} = uiSlice.actions
export const uiReducer = uiSlice.reducer
