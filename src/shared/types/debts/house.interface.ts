import { ICourt } from './court.interface'

export interface IHouse {
	_id: string
	address: string
	courts?: ICourt[]
}

export interface IAddress {
	house: IHouse
	room: string
}
