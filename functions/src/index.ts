import * as admin from 'firebase-admin'

const { getCompanyByInn } = require('./dadata')
const { addShortIdToUser } = require('./db/addShortIdToUser')

admin.initializeApp()

exports.getCompanyByInn = getCompanyByInn
exports.addShortIdToUser = addShortIdToUser
