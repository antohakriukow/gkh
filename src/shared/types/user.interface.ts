export interface IUser {
	uid: string
	email: string
	password: string
	currentCompanyInn: string
	createdAt?: string
	isSubscribed?: boolean
	needToShowIntro?: boolean
}

export interface IUserEmail extends Pick<IUser, 'email'> {}
export interface IUserPassword extends Pick<IUser, 'password'> {}
