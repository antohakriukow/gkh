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
		case 'report/create': return 'Проблема с созданием 22-ЖКХ'
		case 'report/generate': return 'Проблема с генерацией 22-ЖКХ'
		case 'report/pdf': return 'Проблема с сохранением 22-ЖКХ в PDF'
		case 'report/error': return 'Проблема с сохранением 22-ЖКХ в XML'
		case 'report/declined': return 'Росстат не принял 22-ЖКХ'
		case 'report/other': return 'Другая проблема с 22-ЖКХ'

		case 'annual/upload': return 'Проблема с загрузкой данных ОИС'
		case 'annual/process': return 'Проблема с заполнением ОИС'
		case 'annual/download': return 'Проблема при скачивании ОИС'
		case 'annual/payment': return 'Проблема при оплате ОИС'
		case 'annual/result': return 'Ошибки в итоговом ОИС'

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
