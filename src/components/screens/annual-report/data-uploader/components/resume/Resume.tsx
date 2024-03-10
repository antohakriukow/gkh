import { FC, Fragment } from 'react'
import { CgDanger } from 'react-icons/cg'

import {
	IAccount,
	IAccountingOperation,
	IBankOperation,
	TypeAnnualReportStructure
} from '~/shared/types/annual.interface'

import { getAnnualReportStructureName } from '~/utils/annual.utils'

import ResumeItem from '../shared/resume-item/ResumeItem/ResumeItem'

import styles from './resume.module.scss'

interface IResumeProps {
	annualOperations: IAccountingOperation[] | IBankOperation[]
	annualAccounts: IAccount[]
	annualFileNames: string[]
	annualStartDate: string
	annualFinalDate: string
	annualCompanyNames: string[]
	structure: TypeAnnualReportStructure | undefined
}

const Resume: FC<IResumeProps> = ({
	annualOperations,
	annualAccounts,
	annualFileNames,
	annualStartDate,
	annualFinalDate,
	annualCompanyNames,
	structure
}) => {
	const resumeData = [
		{
			parameter: 'Шаблон отчета',
			value: getAnnualReportStructureName(structure)
		},
		{ parameter: 'Загружено файлов', value: String(annualFileNames) },
		{
			parameter: 'Распознано компаний',
			value: String(
				`${annualCompanyNames.length} (${String(annualCompanyNames)})`
			)
		},
		{
			parameter: 'Распознано счетов',
			value: String(`${annualAccounts.length} (
						${String(annualAccounts.map(acc => ` ***${acc.number.slice(-4)}`))})`)
		},
		{
			parameter: 'Распознано операций',
			value: String(annualOperations.length)
		},
		{ parameter: 'Дата первой операции', value: String(annualStartDate) },
		{ parameter: 'Дата последней операции', value: String(annualFinalDate) }
	]

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
				{resumeData.map(item => (
					<ResumeItem
						key={item.parameter}
						parameter={item.parameter}
						value={item.value ?? ''}
					/>
				))}
			</div>
		</Fragment>
	)
}
export default Resume
