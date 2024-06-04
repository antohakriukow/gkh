import { FC } from 'react'
import { useActions, useCompany, useModal } from '~/hooks'

import { Button } from '~/components/ui'

import { ICompany } from '~/shared/types/company.interface'

import styles from './add-company-modal.module.scss'

const CompanyAdder: FC<{ company: ICompany }> = ({ company }) => {
	const { setNewCompany } = useActions()
	const { hideModal } = useModal()
	const { create, update, companyIsAlreadyExists, handleSetCurrentCompany } =
		useCompany()

	const ALREADY_IS_IN_YOUR_LIST = 'уже в Вашем списке.'
	const REFRESH_DATA = 'обновить данные?'
	const ADD = 'Добавить'
	const TO_COMPANIES_LIST = 'в список компаний?'
	const YES = 'Да'
	const NO = 'Нет'

	const handleAddCompany = () => {
		companyIsAlreadyExists(company.inn.toString())
			? update(company)
			: create(company)
		handleSetCurrentCompany(company.inn)
		setNewCompany(null)
		hideModal()
	}

	const handleAbort = () => {
		setNewCompany(null)
		hideModal()
	}

	return (
		<div className={styles.formContainer}>
			{companyIsAlreadyExists(company.inn.toString()) ? (
				<>
					<p className={styles.adder__company}>{company.name.short}</p>
					<p className={styles.adder__title}>{ALREADY_IS_IN_YOUR_LIST}</p>
					<p className={styles.adder__title}>{REFRESH_DATA}</p>
				</>
			) : (
				<>
					<p className={styles.adder__title}>{ADD}</p>
					<p className={styles.adder__company}>{company.name.short}</p>
					<p className={styles.adder__title}>{TO_COMPANIES_LIST}</p>
				</>
			)}

			<div className={styles.adder__buttons}>
				<Button title={YES} color='success' onClick={handleAddCompany} />
				<Button title={NO} color='danger' onClick={handleAbort} />
			</div>
		</div>
	)
}
export default CompanyAdder
