import * as firebase from 'firebase'
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

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

const newServiceAccount = require('../../serviceaccount.json');

//inicia o firebase
const fire = firebase.default.initializeApp(serviceAccount)
admin.initializeApp({
    credential: admin.credential.cert(newServiceAccount)
})

fire.auth().setPersistence('none');

//Aquifaco uma separacao do firebase para usarmos apenas os modulos necessarios
export const DataService = fire.firestore() //instancia do banco de dados do firestore
export const LoginService = fire.auth() //instancia da autenticacao