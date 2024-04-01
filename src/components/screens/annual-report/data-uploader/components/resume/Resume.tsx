import { resume } from './resume.data'
import { FC } from 'react'
import { CgDanger } from 'react-icons/cg'

import UploadInfoItem from '../shared/upload-info-item/UploadInfoItem'
import { useUploadInfo } from '../shared/useUploadInfo'

import styles from './resume.module.scss'

const Resume: FC = () => {
	const uploadInfo = useUploadInfo()

	return (
		<>
			<div className={styles.danger}>
				<CgDanger size={44} color='#db3140' />
				<p>
					<span>{resume.title}</span>
					{resume.text}
				</p>
			</div>
			<div className={styles.list}>
				{uploadInfo.map(item => (
					<UploadInfoItem
						key={item.title}
						title={item.title}
						value={item.value ?? ''}
					/>
				))}
			</div>
		</>
	)
}
export default Resume
