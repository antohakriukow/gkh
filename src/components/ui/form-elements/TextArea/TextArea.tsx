import cn from 'classnames'
import { forwardRef } from 'react'

import { ITextarea } from '../form.interface'

import styles from './TextArea.module.scss'

const TextArea = forwardRef<HTMLTextAreaElement, ITextarea>(
	({ placeholder, error, style, ...props }, ref) => {
		return (
			<div className={styles.container} style={style}>
				<label className={styles.label}>
					{placeholder && <span>{placeholder}</span>}
					<textarea ref={ref} {...props} />
				</label>
				{error?.message && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'
export default TextArea
