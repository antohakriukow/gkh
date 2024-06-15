type Option = {
	label: string
	id: string
}

export const extractSelectorOptionsFromEnum = (enumObj: any): Option[] => {
	return Object.keys(enumObj).map(key => ({
		label: enumObj[key as keyof typeof enumObj],
		id: key
	}))
}

export const generateEnumKeyMap = <T extends object>(
	enumObj: T
): { [key: string]: string } => {
	return Object.keys(enumObj)
		.filter(key => isNaN(Number(key)))
		.reduce(
			(acc, key) => {
				acc[key] = key
				return acc
			},
			{} as { [key: string]: string }
		)
}
