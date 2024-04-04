import { TypeIssueStatus } from '~/shared/types/issue.interface'

import { getIssueColor } from '../utils'

describe('getIssueColor', () => {
	it.each([
		['open', '#bfbfbf'],
		['pending', '#aaefa5'],
		['resolved', '#45dc38'],
		['closed', '#e87d86'],
		['unexpected', '#bfbfbf']
	])('with status %s -> returns %s', (status, expected) => {
		expect(getIssueColor(status as TypeIssueStatus)).toBe(expected)
	})
})
