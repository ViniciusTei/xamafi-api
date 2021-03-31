import * as firebase from 'firebase'
import * as dotenv from 'dotenv';

//faz funcionar o arquivo .env
dotenv.config();
const serviceAccount =  {
    apiKey: process.env['FIREBASE_APIKEY'],
    authDomain: process.env['FIREBASE_AUTHDOMAIN'],
    projectId: process.env['FIREBASE_PROJECTID'],
    storageBucket: process.env['FIREBASE_STORAGEBUCKET'],
    messagingSenderId: process.env['FIREBASE_MESSAGINSENDERID'],
    appId: process.env['FIREBASE_APPID'],
    measurementId: process.env['FIREBASE_MEASUREMENTID']
};

//inicia o firebase e retorna a instancia do firestore usada como database
export const DataService = firebase.default.initializeApp(serviceAccount).firestore()