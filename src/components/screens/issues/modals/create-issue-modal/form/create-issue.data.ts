export const issueSubjectOptions = [
	{ label: 'Проблема с созданием 22-ЖКХ', value: 'report/create' },
	{ label: 'Проблема с генерацией 22-ЖКХ', value: 'report/generate' },
	{ label: 'Проблема с сохранением 22-ЖКХ в PDF', value: 'report/pdf' },
	{ label: 'Проблема с сохранением 22-ЖКХ в XML', value: 'report/error' },
	{ label: 'Росстат не принял 22-ЖКХ', value: 'report/declined' },
	{ label: 'Другая проблема с 22-ЖКХ', value: 'report/other' },

	{ label: 'Проблема с загрузкой данных ОИС', value: 'report/upload' },
	{ label: 'Проблема с заполнением ОИС', value: 'report/process' },
	{ label: 'Проблема при скачивании ОИС', value: 'report/download' },
	{ label: 'Проблема при оплате ОИС', value: 'report/payment' },
	{ label: 'Ошибки в итоговом ОИС', value: 'report/result' },

	{ label: 'Проблема с доступом', value: 'auth' },
	{ label: 'Другая проблема', value: 'other' }
]
