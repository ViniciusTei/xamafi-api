import express from 'express';
import {Router} from 'express';
import * as firebase from 'firebase'

const router = Router();
const serviceAccount =  {
    apiKey: "AIzaSyDsnWi-c1njM-Bjs2204mzueNnBLt8ilR8",
    authDomain: "xamafi-8e37a.firebaseapp.com",
    projectId: "xamafi-8e37a",
    storageBucket: "xamafi-8e37a.appspot.com",
    messagingSenderId: "318493703716",
    appId: "1:318493703716:web:adc3d7175feb74df9f62b1",
    measurementId: "G-H0G72RMTNZ"
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