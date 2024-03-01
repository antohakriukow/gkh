import { annualReducer } from './annual/annual.slice'
import { uiReducer } from './ui/ui.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		annual: annualReducer
	}
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
