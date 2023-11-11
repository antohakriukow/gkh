import { IuiState } from './ui.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICompany } from '~/shared/types/company.interface'

const initialState: IuiState = {
	newCompany: null,
	currentCompany: null
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
		}
	}
})

export const { clearUI, setNewCompany, setCurrentCompany } = uiSlice.actions
export const uiReducer = uiSlice.reducer
