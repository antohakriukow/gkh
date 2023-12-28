import { generateFinalReport } from './22gkh'
import { createLog } from './db/createLog'
import * as admin from 'firebase-admin'

const { getCompanyByInn } = require('./dadata')
const { addShortIdToUser } = require('./db/addShortIdToUser')

admin.initializeApp()

exports.getCompanyByInn = getCompanyByInn
exports.addShortIdToUser = addShortIdToUser
exports.createLog = createLog
exports.generateFinalReport = generateFinalReport
