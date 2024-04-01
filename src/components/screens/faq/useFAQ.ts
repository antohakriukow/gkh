import { useNavigate } from 'react-router-dom'

export const useFAQ = () => {
	const navigate = useNavigate()
	const INSTRUCTIONS = 'Инструкции'
	const REPORT_FILLING_RULES = 'Правила заполнения 22-ЖКХ'

	const handleGoBack = () => {
		navigate('/reports')
	}

	return { INSTRUCTIONS, REPORT_FILLING_RULES, handleGoBack }
}
