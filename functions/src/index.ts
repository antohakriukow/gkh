import { check22gkhReport } from './22gkh/checkReport/check22gkhReport'
import { generateFinalReport } from './22gkh/generate22gkhReport/generateFinalReport'
import { getCompanyByInn } from './dadata'
import { addShortIdToUser } from './db/addShortIdToUser'
import { createLog } from './db/createLog'
import * as admin from 'firebase-admin'

// const { getCompanyByInn } = require('./dadata')
// const { addShortIdToUser } = require('./db/addShortIdToUser')

admin.initializeApp()

exports.getCompanyByInn = getCompanyByInn
exports.addShortIdToUser = addShortIdToUser
exports.generateFinalReport = generateFinalReport
exports.createLog = createLog
exports.check22gkhReport = check22gkhReport
