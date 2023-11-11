import { uiReducer } from './ui/ui.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		ui: uiReducer
	}
})

export type TypeRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
