import {
	clearOAnnualState,
	setAccounts,
	setFileNames,
	setFinalDate,
	setOperations,
	setStartDate
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

	clearOAnnualState,
	setOperations,
	setAccounts,
	setFileNames,
	setStartDate,
	setFinalDate
}
