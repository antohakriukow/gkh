import { useParams } from 'react-router-dom'

import { useData } from '~/hooks/useData'

export const useAnnualReport = () => {
	const { annuals } = useData()
	const { reportId } = useParams()
	const currentAnnualReport = annuals.find(
		annual => annual._id.toString() === reportId?.toString()
	)

	const finalFunction = () => console.log('finalFunction')
	const finalButtonTitle = 'Предпросмотр'

	return { finalFunction, finalButtonTitle, currentAnnualReport }
}
