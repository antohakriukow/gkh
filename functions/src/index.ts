import { check22gkhReport } from './22gkh/check22gkhReport/check22gkhReport'
import { generateFinalReport } from './22gkh/generateFinalReport/generateFinalReport'
import { getCompanyByInn } from './dadata/getCompanyByInn'
import { addShortIdToUser } from './db/addShortIdToUser'
import { createLog } from './db/createLog'
import { sendEmail } from './mail/sendEmail'
import { writePaymentInDB } from './payment/writePaymentInDB'
import * as admin from 'firebase-admin'

admin.initializeApp()

exports.getCompanyByInn = getCompanyByInn
exports.addShortIdToUser = addShortIdToUser
exports.createLog = createLog
exports.check22gkhReport = check22gkhReport
exports.generateFinalReport = generateFinalReport
exports.sendEmail = sendEmail
exports.writePaymentInDB = writePaymentInDB
