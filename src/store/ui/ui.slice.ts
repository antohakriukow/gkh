import { IuiState } from './ui.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICompany } from '~/shared/types/company.interface'
import { IReport } from '~/shared/types/report.interface'

const initialState: IuiState = {
	currentCompany: null,
	currentReport: null,

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
		setNewCompany: (state, action: PayloadAction<ICompany | null>) => {
			state.currentReport = null
			state.newCompany = action.payload
		}
	}
})

export const { clearUI, setCurrentCompany, setCurrentReport, setNewCompany } =
	uiSlice.actions
export const uiReducer = uiSlice.reducer
