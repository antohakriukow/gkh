import { getBody } from './body/getBody'
import { getHeaders } from './headers/getHeaders'
import { getSignature } from './signature/getSignature'
import { getTitle } from './title/getTitle'
import { Document, IMargins } from 'docx'

import { IDebt } from '~/shared/types/debts/debt.interface'

const defaultMargin: IMargins = {
	top: 720,
	bottom: 720,
	left: 1440,
	right: 720
}

export const magistrateClaimTemplate = (debt: IDebt) =>
	new Document({
		styles: {
			paragraphStyles: [
				{
					id: 'Normal',
					name: 'Normal',
					run: {
						font: 'Times New Roman',
						size: 24
					}
				}
			]
		},
		sections: [
			{
				properties: {
					page: {
						margin: defaultMargin
					}
				},
				children: [
					...getHeaders(debt),
					...getTitle(),
					...getBody(debt),
					...getSignature(debt)
				]
			}
		]
	})
