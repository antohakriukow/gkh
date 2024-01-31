import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

export const useGraph = () => {
	const { categories } = useTypedSelector(state => state.annual)
	const { addAnnualCategory, removeAnnualCategory, updateAnnualCategoryTitle } =
		useActions()

	return {
		categories,
		addAnnualCategory,
		removeAnnualCategory,
		updateAnnualCategoryTitle
	}
}
