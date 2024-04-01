import { FC, PropsWithChildren } from 'react'

import SubHeading from '../heading/SubHeading'

import styles from './subHeader.module.scss'

const SubHeader: FC<PropsWithChildren<{ title: string }>> = ({
	children,
	title
}) => {
	return (
		<div className={styles.container}>
			<SubHeading title={title} />
			<div>{children}</div>
		</div>
	)
}
export default SubHeader
