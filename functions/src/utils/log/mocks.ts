import {
	TypeLogCode,
	TypeLogLevel
} from '../../../../src/shared/types/log.interface'

interface IGenerateLogMessageMock {
	level: TypeLogLevel
	code: TypeLogCode
	expected: string
}
export const generateLogMessageInfoMock: IGenerateLogMessageMock[] = [
	{ level: 'info', code: 'auth/login', expected: 'Вход в систему' },
	{ level: 'info', code: 'auth/logout', expected: 'Выход из системы' },
	{ level: 'info', code: 'auth/register', expected: 'Регистрация в системе' },
	{ level: 'info', code: 'report22/create', expected: 'Отчет 22-ЖКХ создан' },
	{ level: 'info', code: 'report22/save', expected: 'Отчет 22-ЖКХ сохранен' },
	{ level: 'info', code: 'report22/delete', expected: 'Отчет 22-ЖКХ удален' },
	{
		level: 'info',
		code: 'report22/generate',
		expected: 'Отчет 22-ЖКХ сгенерирован'
	},
	{
		level: 'info',
		code: 'report22/xml',
		expected: 'Сгенерирован отчет 22-ЖКХ в XML'
	},
	{
		level: 'info',
		code: 'report22/pdf',
		expected: 'Сгенерирован отчет 22-ЖКХ в PDF'
	},
	{ level: 'info', code: 'company/create', expected: 'Компания создана' },
	{ level: 'info', code: 'company/update', expected: 'Компания обновлена' },
	{ level: 'info', code: 'company/delete', expected: 'Компания удалена' },
	{ level: 'info', code: 'issues/error', expected: 'Обновление в issues' },
	{ level: 'info', code: 'message/error', expected: 'Обновление в message' },
	{
		level: 'info',
		code: 'unexpected/code' as TypeLogCode,
		expected: 'Неизвестное событие'
	}
]

export const generateLogMessageErrorMock: IGenerateLogMessageMock[] = [
	{ level: 'error', code: 'auth/login', expected: 'Ошибка входа в систему' },
	{ level: 'error', code: 'auth/logout', expected: 'Ошибка выхода из системы' },
	{
		level: 'error',
		code: 'auth/register',
		expected: 'Ошибка регистрации в системе'
	},
	{
		level: 'error',
		code: 'report22/create',
		expected: 'Ошибка создания отчета 22-ЖКХ'
	},
	{
		level: 'error',
		code: 'report22/save',
		expected: 'Ошибка сохранения отчета 22-ЖКХ'
	},
	{
		level: 'error',
		code: 'report22/delete',
		expected: 'Ошибка удаления отчета 22-ЖКХ'
	},
	{
		level: 'error',
		code: 'report22/generate',
		expected: 'Ошибка генерации отчета 22-ЖКХ'
	},
	{
		level: 'error',
		code: 'report22/xml',
		expected: 'Ошибка генерации отчета 22-ЖКХ в XML'
	},
	{
		level: 'error',
		code: 'report22/pdf',
		expected: 'Ошибка генерации отчета 22-ЖКХ в PDF'
	},
	{
		level: 'error',
		code: 'company/create',
		expected: 'Ошибка создания компании'
	},
	{
		level: 'error',
		code: 'company/update',
		expected: 'Ошибка обновления компании'
	},
	{
		level: 'error',
		code: 'company/delete',
		expected: 'Ошибка удаления компании'
	},
	{ level: 'error', code: 'issues/error', expected: 'Ошибка в issues' },
	{ level: 'error', code: 'message/error', expected: 'Ошибка в message' },
	{
		level: 'error',
		code: 'unexpected/error' as TypeLogCode,
		expected: 'Неизвестная ошибка'
	}
]
