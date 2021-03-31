import express from 'express';
import {Router} from 'express';
import * as firebase from 'firebase'
import * as dotenv from 'dotenv';


//faz funcionar o arqui .env
dotenv.config();

const router = Router();

const serviceAccount =  {
    apiKey: process.env['FIREBASE_APIKEY'],
    authDomain: process.env['FIREBASE_AUTHDOMAIN'],
    projectId: process.env['FIREBASE_PROJECTID'],
    storageBucket: process.env['FIREBASE_STORAGEBUCKET'],
    messagingSenderId: process.env['FIREBASE_MESSAGINSENDERID'],
    appId: process.env['FIREBASE_APPID'],
    measurementId: process.env['FIREBASE_MEASUREMENTID']
};

firebase.default.initializeApp(serviceAccount)
const db = firebase.default.firestore()

let routes = router.get('/', async (req, res) => {
    let users:any[] = []
   await db.collection('users').get()
   .then(
       
       (snap: any) => {
           snap.forEach((doc: any) => {
            users.push({
                id: doc.id,
                ...doc.data()
            })

            res.json(users)
        })
       }
   )

})

// Create a new express application instance
const app: express.Application = express();

// support application/json type post data
app.use(routes);

// Mount the WelcomeController at the /welcome route
// app.use('/welcome', WelcomeController);

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});