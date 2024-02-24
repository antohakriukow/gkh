import { FC } from 'react'

import {
	IExtendedAccountingOperation,
	IExtendedBankOperation
} from '~/shared/types/annual.interface'

import { useFinalStep } from '../useFinalStep'

const AccrualsReport: FC<{
	operations: IExtendedAccountingOperation[]
}> = () => {
	return <div></div>
}
export default AccrualsReport
