import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_AUTH_APP_ID
})

export const auth = app.auth()
export default app