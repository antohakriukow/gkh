export const tips = [
	{
		title: 'Кому нужно заполнять отчет?',
		text: `Всем респондентам, которые попали в выборку Росстата. Точный перечень отчетов, которые необходимо сдавать Вы можете узнать по ИНН <a href="https://websbor.rosstat.gov.ru/online/info" target="_blank" rel="noopener noreferrer">на сайте Росстата</a>.`
	},
	{
		title: 'В каких единицах заполнять отчет?',
		text: 'В сервисе "Экспресс 22" заполнение происходит в рублях (можно не указывать копейки). Алгоритм затем разделит все данные на 1000 и отбросит дробную часть, так что в итоговый отчет попадут данные в верном формате - в тысячах рублей.'
	},
	{
		title:
			'ЖКУ начисляет расчетный центр. Как отразить коммунальные услуги в отчете?',
		text: 'Даже если начисление ЖКУ осуществляет расчетный центр, то ТСЖ / ЖСК всё равно является исполнителем коммунальных услуг, следовательно, все начисления должны быть отражены в отчете. Исключение – услуги, по которым у собственников заключены прямые договоры с ресурсоснабжающей организацией (РСО). Начисления по этим услугам в отчете отразит РСО.'
	},
	{
		title: 'УО начисляет ЖКУ жилым и нежилым помещениям. Как заполнить отчет?',
		text: 'Внесите общие суммы начислений в форму. Алгоритм распределит начисления между жилыми и нежилыми помещениями пропорционально их площади. Начисления нежилым помещениям будут включены в строку 15 итогового отчета. Данные о начислениях и оплатах по нежилым помещениям также будут отражены в Разделе 2 итогового отчета'
	},
	{
		title: 'Что входит в поле «Управление МКД»?',
		text: `В поле «Управление МКД» входят начисления по следующим статьям:
		- Управление МКД,
		- Административно-управленческие расходы (АУР),
		- Административно-хозяйственные расходы (АХР).`
	},
	{
		title: 'Что входит в поле «Содержание и текущий ремонт ОИ»?',
		text: `В поле «Содержание и текущий ремонт ОИ» следует включить начисление по следующим статьям:
		- содержание общего имущества,
		- текущий ремонт,
		- уборка и санитарно-гигиеническая очистка земельного участка,
		- очистка мусоропроводов,
		- содержание и ремонт автоматически запирающихся устройств дверей подъездов,
		- содержание и ремонт систем автоматизированной противопожарной защиты,
		- содержание и текущий ремонт внутридомовых инженерных систем газоснабжения,
		- эксплуатация коллективных (общедомовых) приборов учета, содержание и текущий ремонт систем экстренного оповещения населения об угрозе возникновения или о возникновении чрезвычайных ситуаций,
		- содержание и ремонт лифтов.
		Также сюда стоит включить расходы на содержание любого оборудования, такого как котельная, ИТП и пр.`
	},
	{
		title: 'Что входит в поле "Прочее"?',
		text: `Эти суммы следует внести в графу «Прочие» в блоке «Начисления ЖКУ за отчетный период». Алгоритм включит эти суммы в строку 15 итогового отчета. В графу прочие необходимо внести общую сумму начислений по таким статьям:
		- телевизионная антенна,
		- радио,
		- охрана,
		- интернет,
		- реклама,
		- аренда,
		- услуги консьержей,
		- диспетчеров,
		- видеонаблюдение,
		- парковки,
		- пени,
		- повышающие коэффициенты,
		- услуги банка,
		- услуги ВЦ,
		- канцелярия и прочее`
	},
	{
		title: 'Если есть подогрев ГВС.',
		text: 'Если УО осуществляет подогрев ХВС для целей ГВС, то для целей заполнения отчета 22-ЖКХ (жилище) следует считать, что УО начисляет ХВС для ГВС и тепловую энергию для ГВС. Начисление ГВС в данном случае не производится.'
	},
	{
		title: 'Если есть газовая котельная.',
		text: 'Если дом оснащен собственной газовой котельной, поля «ГВС» и «Отопление» для таких домов не заполняются. Необходимо указать стоимость газа, на котором работает котельная, и холодной воды, которая нагревается.'
	},
	{
		title: 'Если УО применяет общую систему налогообложения (Плательщик НДС).',
		text: 'Если УО применяет общую систему налогообложения, то необходимо в форме заполнения отчета в блоке «Параметры» указать, что УО – плательщик НДС. Тогда под блоком «Начисления ЖКУ за отчетный период» появится дополнительный блок «В том числе НДС». Заполните его и алгоритм исключит НДС из первого раздела итогового отчета.'
	}
]
