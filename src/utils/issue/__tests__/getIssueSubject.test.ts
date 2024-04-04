import { TypeIssueSubject } from '~/shared/types/issue.interface'

import { getIssueSubject } from '../utils'

describe('getIssueSubject', () => {
	it.each([
		['report/create', 'Проблема с созданием 22-ЖКХ'],
		['report/generate', 'Проблема с генерацией 22-ЖКХ'],
		['report/pdf', 'Проблема с сохранением 22-ЖКХ в PDF'],
		['report/error', 'Проблема с сохранением 22-ЖКХ в XML'],
		['report/declined', 'Росстат не принял 22-ЖКХ'],
		['report/other', 'Другая проблема с 22-ЖКХ'],

		['annual/upload', 'Проблема с загрузкой данных ОИС'],
		['annual/process', 'Проблема с заполнением ОИС'],
		['annual/download', 'Проблема при скачивании ОИС'],
		['annual/payment', 'Проблема при оплате ОИС'],
		['annual/result', 'Ошибки в итоговом ОИС'],

		['auth', 'Проблема с доступомIIssue'],
		['other', 'Другая проблема'],
		['unexpected', 'unexpected']
	])('with subject %s - returns %s', (subject, expected) => {
		expect(getIssueSubject(subject as TypeIssueSubject)).toBe(expected)
	})
})
