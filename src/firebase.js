import firebase from 'firebase/compat/app';
require('firebase/compat/auth');
require('firebase/compat/firestore');

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_AUTH_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_AUTH_APP_ID
})

export const auth = app.auth()
export const firestore = app.firestore()

export default app