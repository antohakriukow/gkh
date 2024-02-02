import { data } from './data'
import cn from 'clsx'
import { FC, useEffect } from 'react'

import { SubHeading } from '~/components/ui'

import { useActions } from '~/hooks/useActions'
import { useTypedSelector } from '~/hooks/useTypedSelector'

import { TypeAnnualReportStructure } from '~/shared/types/annual.interface'

import styles from './StructureSelector.module.scss'

const StructureSelector: FC = () => {
	const { setAnnualStructure } = useActions()
	const { currentAnnualReport } = useTypedSelector(state => state.ui)
	const { structure } = useTypedSelector(state => state.annual)

	useEffect(() => {
		if (currentAnnualReport?.data.settings?.structure)
			setAnnualStructure(currentAnnualReport?.data.settings?.structure)
	}, [currentAnnualReport, setAnnualStructure])

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnnualStructure(event.currentTarget.id as TypeAnnualReportStructure)
	}

	const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.stopPropagation()
	}

	return (
		<form className={styles.container}>
			<SubHeading title='Выберите шаблон отчета:' />
			<div className={styles.cards}>
				{data.map((item, index) => (
					<div
						id={item.type}
						key={index}
						onClick={handleClick}
						className={cn(styles.card, {
							[styles.active]: structure === item.type
						})}
					>
						<label htmlFor={item.type}>
							<span className={styles.title}>{item.title}</span>
							<span className={styles.description}>{item.description}</span>
						</label>
						<a
							onClick={handleLinkClick}
							className={styles.link}
							href={item.link}
						>
							Смотреть образец
						</a>
					</div>
				))}
			</div>
		</form>
	)
}

export default StructureSelector
