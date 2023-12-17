// import { Request, Response } from 'express'
// import * as admin from 'firebase-admin'
// import * as functions from 'firebase-functions/v1'

// admin.initializeApp()

// const cors = require('cors')({ origin: true })

// exports.getShortId = functions.https.onRequest(
// 	(req: Request, res: Response) => {
// 		cors(req, res, async () => {
// 			try {
// 				const usersRef = admin.database().ref('users')
// 				const snapshot = await usersRef.once('value')
// 				const usersCount = snapshot.numChildren()
// 				const shortId = `A1${1000 + usersCount + 1}`

// 				res.send({ data: shortId })
// 			} catch (error) {
// 				res.status(500).send({ error: 'Internal Server Error' })
// 			}
// 		})
// 	}
// )
