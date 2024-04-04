import { FC, useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { usePeriod } from '~/hooks'

import { convertPeriod } from '~/utils/report/utils'

import styles from './PeriodSetter.module.scss'

interface IPeriodSetter {
	type: 'period' | 'year'
}

const PeriodSetter: FC<IPeriodSetter> = ({ type }) => {
	const {
		reportYear,
		reportPeriod,
		incrementYear,
		decrementYear,
		incrementPeriod,
		decrementPeriod
	} = usePeriod()
	const [value, setValue] = useState<TypePeriod | TypeYear>(1)

	enum TypePeriod {
		FirstQuarter = 1,
		FirstHalf = 2,
		NineMonths = 3,
		Year = 4
	}

	enum TypeYear {
		Year2020 = 2020,
		Year2021 = 2021,
		Year2022 = 2022,
		Year2023 = 2023,
		Year2024 = 2024
	}

	useEffect(() => {
		if (type === 'year') {
			setValue(reportYear as TypeYear)
		} else if (type === 'period') {
			setValue(reportPeriod as TypePeriod)
		}
	}, [type, reportYear, reportPeriod])

	const handleIncrement = () => {
		if (type === 'year') {
			incrementYear()
		} else if (type === 'period') {
			incrementPeriod()
		}
	}

	const handleDecrement = () => {
		if (type === 'year') {
			decrementYear()
		} else if (type === 'period') {
			decrementPeriod()
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.value}>{convertPeriod(value)}</div>
			<div className={styles.buttonContainer}>
				<button className={styles.button} onClick={handleDecrement}>
					<FaMinus size={16} />
				</button>
				<button className={styles.button} onClick={handleIncrement}>
					<FaPlus size={16} />
				</button>
			</div>
		</div>
	)
}
export default PeriodSetter
