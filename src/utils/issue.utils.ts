import {
	TypeIssueStatus,
	TypeIssueSubject
} from '~/shared/types/issue.interface'

//prettier-ignore
export const getIssueStatus = (status: TypeIssueStatus) => {
	switch (status) {
		case 'open': return 'Создано'
		case 'pending': return 'В работе'
		case 'resolved': return 'Обработано'
		case 'closed': return 'Закрыто'
		default: return status
	}
}

//prettier-ignore
export const getIssueSubject = (subject: TypeIssueSubject) => {
	switch (subject) {
		case 'report/create': return 'Проблема с созданием отчета'
		case 'report/generate': return 'Проблема с генерацией отчета'
		case 'report/pdf': return 'Проблема с сохранением отчета в PDF'
		case 'report/error': return 'Проблема с сохранением отчета в XML'
		case 'report/declined': return 'Росстат не принял отчет'
		case 'report/other': return 'Другая проблема с отчетом'
		case 'auth': return 'Проблема с доступомIIssue'
		case 'other': return 'Другая проблема'
		default: return subject
	}
}

//prettier-ignore
export const getIssueColor = (status: TypeIssueStatus) => {
	switch (status) {
		case 'open': return '#bfbfbf'
		case 'pending': return '#aaefa5'
		case 'resolved': return '#45dc38'
		case 'closed': return '#e87d86'
		default: return '#bfbfbf'
	}
}
