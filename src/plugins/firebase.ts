import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: `${process.env.firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${process.env.firebaseProjectId}.firebaseio.com`,
  projectId: process.env.firebaseProjectId,
  storageBucket: `${process.env.firebaseProjectId}.appspot.com`,
  messagingSenderId: process.env.firebaseMessagingSenderId,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
