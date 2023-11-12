import { IuiState } from './ui.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICompany } from '~/shared/types/company.interface'
import { TypePeriod, TypeYear } from '~/shared/types/period.interface'

const initialState: IuiState = {
	newCompany: null,
	currentCompany: null,
	newReportYear: null,
	newReportPeriod: null
}

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		clearUI: state => {
			state.newCompany = null
		},
		setNewCompany: (state, action: PayloadAction<ICompany | null>) => {
			state.newCompany = action.payload
		},
		setCurrentCompany: (state, action: PayloadAction<ICompany | null>) => {
			state.currentCompany = action.payload
		},
		setNewReportYear: (state, action: PayloadAction<TypeYear | null>) => {
			state.newReportYear = action.payload
		},
		setNewReportPeriod: (state, action: PayloadAction<TypePeriod | null>) => {
			state.newReportPeriod = action.payload
		}
	}
})

export const {
	clearUI,
	setNewCompany,
	setCurrentCompany,
	setNewReportYear,
	setNewReportPeriod
} = uiSlice.actions
export const uiReducer = uiSlice.reducer
