export enum TypeCourt {
	court = 'Суд',
	magistrate = 'Мировой суд'
}

export interface ICourt {
	type: TypeCourt
	name: string
	address: string
}
