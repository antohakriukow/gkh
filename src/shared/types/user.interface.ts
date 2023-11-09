export interface IUser {
	uid: string
	email: string
	password: string
	createdAt?: string
	isSubscribed?: boolean
}

export interface IUserEmail extends Pick<IUser, 'email'> {}
export interface IUserPassword extends Pick<IUser, 'password'> {}
