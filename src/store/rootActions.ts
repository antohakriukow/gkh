import {
	addAnnualCategory,
	addAnnualCategoryChild,
	clearAnnualState,
	removeAnnualCategory,
	removeAnnualCategoryChild,
	setAnnualAccounts,
	setAnnualError,
	setAnnualFileNames,
	setAnnualFinalDate,
	setAnnualOperations,
	setAnnualStartDate,
	setAnnualStructure,
	updateAnnualCategoryTitle
} from './annual/annual.slice'
import {
	clearUI,
	setCurrentAnnualReport,
	setCurrentCompany,
	setCurrentReport,
	setNewCompany
} from './ui/ui.slice'

export const allActions = {
	clearUI,
	setCurrentCompany,
	setCurrentReport,
	setCurrentAnnualReport,
	setNewCompany,

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
}
