import { FC } from 'react'

import { Button } from '~/components/ui'

import { useActions } from '~/hooks/useActions'
import { useCompany } from '~/hooks/useCompany'
import { useModal } from '~/hooks/useModal'

import { ICompany } from '~/shared/types/company.interface'

import styles from '../../Header.module.scss'

const CompanyAdder: FC<{ company: ICompany }> = ({ company }) => {
	const { setNewCompany } = useActions()
	const { hideModal } = useModal()
	const { create, update, companyIsAlreadyExists } = useCompany()

	const handleAddCompany = () => {
		companyIsAlreadyExists(company.inn.toString())
			? update(company)
			: create(company)
		setNewCompany(null)
		hideModal()
	}

	const handleAbort = () => {
		setNewCompany(null)
		hideModal()
	}

	return (
		<div>
			{companyIsAlreadyExists(company.inn.toString()) ? (
				<>
					<p className={styles.adder__company}>{company.name.short}</p>
					<p className={styles.adder__title}>уже в Вашем списке.</p>
					<p className={styles.adder__title}>обновить данные?</p>
				</>
			) : (
				<>
					<p className={styles.adder__title}>Добавить</p>
					<p className={styles.adder__company}>{company.name.short}</p>
					<p className={styles.adder__title}>в список компаний?</p>
				</>
			)}

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
