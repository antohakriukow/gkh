import {
	clearAnnualState,
	setAnnualAccounts,
	setAnnualCategories,
	setAnnualError,
	setAnnualFileNames,
	setAnnualFinalDate,
	setAnnualOperations,
	setAnnualStartDate,
	setAnnualStructure
} from './annual/annual.slice'
import {
	clearUI,
	setAnnualReportInitialDataSavedToDb,
	setCurrentAnnualReport,
	setCurrentCompany,
	setCurrentReport,
	setIsLoading,
	setNewCompany
} from './ui/ui.slice'

export const allActions = {
	clearUI,
	setCurrentCompany,
	setCurrentReport,
	setCurrentAnnualReport,
	setNewCompany,
	setAnnualReportInitialDataSavedToDb,
	setIsLoading,

	clearAnnualState,
	setAnnualStructure,
	setAnnualOperations,
	setAnnualAccounts,
	setAnnualFileNames,
	setAnnualStartDate,
	setAnnualFinalDate,
	setAnnualError,

	setAnnualCategories
}
