export const calculateDuty = (
	debtAmount: number,
	isMagistrate: boolean
): { duty: number; formula: string } => {
	let duty = 0
	let formula = ''

	if (debtAmount <= 20000) {
		duty = Math.max(0.04 * debtAmount, 400)
		formula = `0.04 * ${debtAmount} = ${duty}`
	} else if (debtAmount <= 100000) {
		duty = 800 + 0.03 * (debtAmount - 20000)
		formula = `800 + 0.03 * (${debtAmount} - 20000) = ${duty}`
	} else if (debtAmount <= 200000) {
		duty = 3200 + 0.02 * (debtAmount - 100000)
		formula = `3200 + 0.02 * (${debtAmount} - 100000) = ${duty}`
	} else if (debtAmount <= 1000000) {
		duty = 5200 + 0.01 * (debtAmount - 200000)
		formula = `5200 + 0.01 * (${debtAmount} - 200000) = ${duty}`
	} else {
		duty = 13200 + 0.005 * (debtAmount - 1000000)
		formula = `13200 + 0.005 * (${debtAmount} - 1000000) = ${duty}`
		if (duty > 60000) {
			duty = 60000
			formula = `13200 + 0.005 * (${debtAmount} - 1000000) = 60000 (предел)`
		}
	}

	if (isMagistrate) {
		duty /= 2
		duty = Math.ceil(duty * 100) / 100
		formula += ` (уменьшено на половину для мирового судьи: ${duty})`
	} else {
		duty = Math.ceil(duty * 100) / 100
	}

	return {
		duty: parseFloat(duty.toFixed(2)),
		formula: formula
	}
}
