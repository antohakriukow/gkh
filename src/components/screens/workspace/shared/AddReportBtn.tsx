import { FC } from 'react'

import { Button } from '~/components/ui'

const AddReportBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<Button style={{ width: '100%' }} onClick={onClick}>
			Создать отчет
		</Button>
	)
}
export default AddReportBtn
