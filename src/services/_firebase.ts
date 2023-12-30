import { initializeApp } from 'firebase/app'
import {
	User,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFunctions, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
export const functions = getFunctions(app)

export const register = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password)

export const login = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export const verifyEmail = async (user: User) =>
	await sendEmailVerification(user)

export const resetPassword = async (email: string) =>
	await sendPasswordResetEmail(auth, email)

export const addShortIdToUserCF = httpsCallable(functions, 'addShortIdToUser')
export const getCompanyByInnCF = httpsCallable(functions, 'getCompanyByInn')
export const createLogCF = httpsCallable(functions, 'createLog')
export const checkReportCF = httpsCallable(functions, 'check22gkhReport')
export const generateFinalReportCF = httpsCallable(
	functions,
	'generateFinalReport'
)
