import { FC } from 'react'

import { Button } from '~/components/ui'

const AddCompanyBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<Button style={{ marginTop: 4, width: '100%' }} onClick={onClick}>
			Добавить компанию
		</Button>
	)
}
export default AddCompanyBtn
