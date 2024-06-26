import { Paragraph } from 'docx'
import { now } from '~/core/debts/utils'

import { IDebt, isMainDirection } from '~/shared/types/debts/debt.interface'

import {
	convertToRoubles,
	setBoldText,
	setBoldTextCenter,
	setEmptyRow,
	setText
} from '../../docx.utils'
import { requiredAttachments } from '../data'

export const getBody = (debt: IDebt): Paragraph[] => [
	setText(
		`На основании решения общего собрания собственников ${debt.collector.name} является управляющей организацией в многоквартирном доме по адресу: ${debt.address.house}, ${debt.address.room}.`
	),
	setText(
		`${debt.collector.name} обязательства по предоставлению коммунальных услуг, надлежащему содержанию и ремонту общего имущества в многоквартирном доме выполнило в полном объеме.`
	),
	setText(
		`В свою очередь должник ${debt.debtor.data.name} свои обязательства по оплате услуг, оказанных ${debt.collector.name} не исполнил.`
	),
	setText(
		`Собственник помещения в многоквартирном доме обязан участвовать в расходах на содержание общего имущества соразмерно своей доле в праве общей собственности на это имущество путем внесения платы за содержание и ремонт помещения (п. 1 ст. 158 ЖК РФ) и оплачивать коммунальные услуги (ст. 153 ЖК РФ). `
	),
	setText(
		`${debt.debtor.data.name} - собственник квартиры(помещения) № ${
			debt.address.room
		}, расположенной(ого) по адресу: ${
			debt.address.house
		}, имеет задолженность перед ${debt.collector.name} по оплате ${
			isMainDirection(debt.options.direction)
				? 'расходов на содержание и ремонт общего имущества в многоквартирном доме и коммунальных услуг'
				: 'взносов на капитальный ремонт'
		} за период c ${debt.main.data.at(0)
			?.startDate} по ${now}  в размере ${convertToRoubles(debt.main.total)}`
	),
	setText(
		`Согласно п. 14 ст. 155 ЖК РФ лица, несвоевременно и (или) не полностью внесшие плату за жилое помещение и коммунальные услуги, обязаны уплатить кредитору пени.`
	),
	setText(
		`Пени за просрочку исполнения обязательства по оплате ${
			isMainDirection(debt.options.direction)
				? 'ЖКУ'
				: 'взносов на капитальный ремонт'
		} составляют ${convertToRoubles(
			debt.penalties.total
		)} (расчет пени прилагается к настоящему заявлению).`
	),
	setText(
		`В соответствии со ст.ст. 309, 310 ГК РФ обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства и требованиями закона, иных правовых актов, а при отсутствии таких условий и требований – в соответствии с обычаями или иными обычно предъявляемыми требованиями. При этом односторонний отказ от исполнения обязательства или изменение его условий не допускается.`
	),
	setText(
		`На основании вышеизложенного, руководствуясь ст.ст. 153–157  ЖК РФ; ст.ст. 121,122 123 ГПК РФ,`
	),
	setEmptyRow(),
	setBoldTextCenter('ПРОШУ'),
	setEmptyRow(),
	setText(
		`Выдать судебный приказ о взыскании с должника ${
			debt.debtor.data.name
		} в пользу взыскателя ${debt.collector.name} задолженности за ${
			isMainDirection(debt.options.direction)
				? 'за жилищно-коммунальные услуги'
				: 'по взносам на капитальный ремонт'
		} в размере ${convertToRoubles(
			debt.main.total
		)}, пени за просрочку исполнения обязательства по оплате ЖКУ в размере ${convertToRoubles(
			debt.penalties.total
		)}, расходы по уплаченной государственной пошлине в размере ${convertToRoubles(
			debt.duty.value
		)} на следующие реквизиты:`
	),
	setEmptyRow(),
	setBoldText(`Получатель: ${debt.collector.name}`),
	setText(`ИНН: ${debt.collector.inn}`),
	setText(`КПП: ${debt.collector.kpp}`),
	setText(`Расчетный счет: ${debt.collector.bankDetails?.account}`),
	setText(
		`Корреспондентский счет: ${debt.collector.bankDetails?.bank.correspondentAccount}`
	),
	setText(`Банк: ${debt.collector.bankDetails?.bank.name}`),
	setText(`БИК: ${debt.collector.bankDetails?.bank.bik}`),
	setEmptyRow(),
	setBoldText('Приложения'),
	...requiredAttachments.map((item, index) => setText(`${index + 1}. ${item}`)),
	...(debt.options?.attachments ?? []).map((item, index) =>
		setText(`${requiredAttachments.length + index + 1}. ${item}`)
	),
	setEmptyRow(),
	setEmptyRow()
]
