import ServiceCard from './components/ServiceCard'
import { infoData, servicesData } from './prices.data'
import { FC } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { personalDataPolicy } from '~/data/law-docs/personal-data-policy'
import { saasContract } from '~/data/law-docs/saas-contract'

import { Heading, Tip } from '~/components/ui'

import { usePDF } from '~/hooks/usePDF'

import styles from './Prices.module.scss'

const Prices: FC = () => {
	const { printSimplePDF } = usePDF()
	const handlePrintContract = () => printSimplePDF(saasContract)
	const handlePrintPersonalDataPolicy = () => printSimplePDF(personalDataPolicy)

	return (
		<div className={styles.container}>
			<Heading title='Цены и информация для Клиентов' />
			<div className={styles.services}>
				{servicesData.map((service, index) => (
					<ServiceCard
						key={index}
						title={service.title}
						description={service.description}
						price={service.price}
						link={service.link}
					/>
				))}
			</div>
			<div className={styles.info}>
				{infoData.map(tip => (
					<Tip title={tip.title} text={tip.text} />
				))}
			</div>
			<div className={styles.downloads}>
				<div onClick={handlePrintContract}>
					<FaRegFilePdf color='#df4956' size={26} />
					<p>Публичная оферта</p>
				</div>
				<div onClick={handlePrintPersonalDataPolicy}>
					<FaRegFilePdf color='#df4956' size={26} />
					<p>Политика обработки персональных данных</p>
				</div>
			</div>
		</div>
	)
}
export default Prices
