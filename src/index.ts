import express from 'express';
import routes from './routes';
import * as dotenv from 'dotenv';


dotenv.config();

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