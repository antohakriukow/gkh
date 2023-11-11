import { FC } from 'react'

import { Button } from '~/components/ui'

import { useActions } from '~/hooks/useActions'
import { useModal } from '~/hooks/useModal'

import { ICompany } from '~/shared/types/company.interface'

import styles from '../../Company.module.scss'
import { useCompany } from '../../useCompany'

const CompanyAdder: FC<{ company: ICompany }> = ({ company }) => {
	const { setNewCompany } = useActions()
	const { hideModal } = useModal()
	const { create } = useCompany()

	const handleAddCompany = () => {
		create(company)
		setNewCompany(null)
		hideModal()
	}

	const handleAbort = () => {
		setNewCompany(null)
		hideModal()
	}

	return (
		<div>
			<p className={styles.adder__title}>Добавить</p>
			<p className={styles.adder__company}>{company.name.short}</p>
			<p className={styles.adder__title}>в список компаний?</p>

			<div className={styles.adder__buttons}>
				<Button color='success' onClick={handleAddCompany}>
					Да
				</Button>
				<Button color='danger' onClick={handleAbort}>
					Нет
				</Button>
			</div>
		</div>
	)
}
export default CompanyAdder
