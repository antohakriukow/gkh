import { Dispatch, SetStateAction } from 'react'

import { IUser } from '~/shared/types/user.interface'

export type TypeUserState = Pick<IUser, 'email' | 'uid'> | null

export interface IContext {
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}
