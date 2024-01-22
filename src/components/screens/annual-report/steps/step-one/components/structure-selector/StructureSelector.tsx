import { data } from './data'
import { Control, Controller } from 'react-hook-form'

import { SubHeading } from '~/components/ui'

import { IAnnualReportSettings } from '~/shared/types/annual.interface'

import styles from './StructureSelector.module.scss'

interface IStructureSelectorProps {
	control: Control<IAnnualReportSettings>
}

const StructureSelector: React.FC<IStructureSelectorProps> = ({ control }) => {
	return (
		<form className={styles.container}>
			<SubHeading title='Выберите шаблон отчета:' />
			<div className={styles.cards}>
				{data.map((item, index) => (
					<div key={index} className={styles.card}>
						<label htmlFor={item.type}>
							<span className={styles.title}>{item.title}</span>
							<span className={styles.description}>{item.description}</span>
						</label>

						<Controller
							name='structure'
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<input
									{...field}
									type='radio'
									value={item.type}
									id={item.type}
								/>
							)}
						/>
					</div>
				))}
			</div>
		</form>
	)
}

export default StructureSelector
