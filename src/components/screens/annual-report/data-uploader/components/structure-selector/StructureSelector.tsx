import { data } from './data'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'

import { TypeAnnualReportStructure } from '~/shared/types/annual.interface'

import styles from './structure-selector.module.scss'

interface IStructureSelectorProps {
	structure: TypeAnnualReportStructure | undefined
	setStructure: Dispatch<SetStateAction<TypeAnnualReportStructure | undefined>>
}

const StructureSelector: FC<IStructureSelectorProps> = ({
	structure,
	setStructure
}) => {
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setStructure(event.currentTarget.id as TypeAnnualReportStructure)
	}

	const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.stopPropagation()
	}

	return (
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
						target='_blank'
						rel='noopener noreferrer'
					>
						Смотреть образец
					</a>
				</div>
			))}
		</div>
	)
}

export default StructureSelector
