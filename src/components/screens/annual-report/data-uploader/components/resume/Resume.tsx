import { FC, Fragment } from 'react'
import { CgDanger } from 'react-icons/cg'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'

import styles from './resume.module.scss'

interface IResumeProps {
	annualOperations: IAccountingOperation[] | IBankOperation[]
	annualAccounts: IAccount[]
	annualFileNames: string[]
	annualStartDate: string
	annualFinalDate: string
	structure: TypeAnnualReportStructure | undefined
}

const Item: FC<{ parameter: string; value: string }> = ({
	parameter,
	value
}) => (
	<div className={styles.item}>
		<p>{parameter}: </p>
		<p>{value}</p>
	</div>
)

const Resume: FC<IResumeProps> = ({
	annualOperations,
	annualAccounts,
	annualFileNames,
	annualStartDate,
	annualFinalDate,
	structure
}) => {
	return (
		<Fragment>
			<div className={styles.danger}>
				<CgDanger size={44} color='#db3140' />
				<p>
					<span>Внимание! </span>Подтвердите правильности введенных данных.
					Вернуться к их редактированию позже будет невозможно.
				</p>
			</div>
			<div className={styles.list}>
				<Item
					parameter='Шаблон отчета'
					value={getAnnualReportStructureName(structure)}
				/>
				<Item parameter='Загружены файлы' value={String(annualFileNames)} />
				<Item
					parameter='Распознано счетов'
					value={String(annualAccounts.length)}
				/>
				<Item
					parameter='Распознано операций'
					value={String(annualOperations.length)}
				/>
				<Item
					parameter='Дата первой операции'
					value={String(annualStartDate)}
				/>
				<Item
					parameter='Дата последней операции'
					value={String(annualFinalDate)}
				/>
			</div>
		</Fragment>
	)
}
export default Resume
