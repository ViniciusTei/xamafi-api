import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

import {HTTPErrorController} from './Controllers/ErrorController';


dotenv.config();

// Create a new express application instance
const app: express.Application = express();

// support application/json type post data
app.use(express.json());
app.use('/api/',routes);
app.use('/',HTTPErrorController.HTTPError);

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});