import { IEntity, IIndividual, TypeLitigant } from './litigant.interface'

interface IIndividualDebtor {
	type: TypeLitigant.individual
	data: IIndividual
}

interface IEntityDebtor {
	type: TypeLitigant.entity
	data: IEntity
}

export type IDebtor = IIndividualDebtor | IEntityDebtor
