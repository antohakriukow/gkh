import { TypeLogCode, TypeLogLevel } from '../types/log.interface'

//prettier-ignore
export const generateLogMessage = (level: TypeLogLevel, code: TypeLogCode) => {
	if (level === 'info') {
		switch(code) {
			case 'auth/login': return 'Вход в систему'
			case 'auth/logout': return 'Выход из системы'
			case 'auth/register': return 'Регистрация в системе'
			case 'report22/create': return 'Отчет 22-ЖКХ создан'
			case 'report22/save': return 'Отчет 22-ЖКХ сохранен'
			case 'report22/delete': return 'Отчет 22-ЖКХ удален'
			case 'report22/generate': return 'Отчет 22-ЖКХ сгенерирован'
			case 'report22/xml': return 'Сгенерирован отчет 22-ЖКХ в XML'
			case 'report22/pdf': return 'Сгенерирован отчет 22-ЖКХ в PDF'
			case 'company/create': return 'Компания создана'
			case 'company/update': return 'Компания обновлена'
			case 'company/delete': return 'Компания удалена'
			default: return 'Неизвестное событие'
		}
	}

	if (level === 'error') {
		switch(code) {
			case 'auth/login': return 'Ошибка входа в систему'
			case 'auth/logout': return 'Ошибка выхода из системы'
			case 'auth/register': return 'Ошибка регистрации в системе'
			case 'report22/create': return 'Ошибка создания отчета 22-ЖКХ'
			case 'report22/save': return 'Ошибка сохранения отчета 22-ЖКХ'
			case 'report22/delete': return 'Ошибка удаления отчета 22-ЖКХ'
			case 'report22/generate': return 'Ошибка генерации отчета 22-ЖКХ'
			case 'report22/xml': return 'Ошибка генерации отчета 22-ЖКХ в XML'
			case 'report22/pdf': return 'Ошибка генерации отчета 22-ЖКХ в PDF'
			case 'company/create': return 'Ошибка создания компании'
			case 'company/update': return 'Ошибка обновления компании'
			case 'company/delete': return 'Ошибка удаления компании'
			default: return 'Неизвестная ошибка'
		}
	}

	return 'Неизвестный уровень логирования'
}
