import 'firebase/analytics'
import 'firebase/database'
import 'firebase/storage';

import firebase from 'firebase/app'

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY_PROD,
    authDomain: process.env.REACT_APP_AUTHDOMAIN_PROD,
    databaseURL: process.env.REACT_APP_DATABASEURL_PROD,
    projectId: process.env.REACT_APP_PROJECTID_PROD,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET_PROD,
    messagingSenderId: process.env.REACT_APP_MESSAGESENDERID_PROD,
    appId: process.env.REACT_APP_APPID_PROD,
    measurementId: process.env.REACT_APP_MEASUR_PROD
};


export  {firebase as default}