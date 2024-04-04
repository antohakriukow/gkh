import { TypeIssueStatus } from '~/shared/types/issue.interface'

import { getIssueStatus } from '../utils'

describe('getIssueStatus', () => {
	it.each([
		['open', 'Создано'],
		['pending', 'В работе'],
		['resolved', 'Обработано'],
		['closed', 'Закрыто'],
		['unexpected', 'unexpected']
	])('with status %s -> returns %s', (status, expected) => {
		expect(getIssueStatus(status as TypeIssueStatus)).toBe(expected)
	})
})
