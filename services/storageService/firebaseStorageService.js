const admin = require('firebase-admin')
//! please ad your own service account key here
const serviceAccount = require('./minisocialmedia-1c24f-firebase-adminsdk-8oxlt-e2cd95dedb.json')


// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL
})
// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
  bucket
}