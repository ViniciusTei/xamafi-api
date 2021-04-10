import * as express from 'express';
import routes from './routes';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import {HTTPErrorController} from './Controllers/ErrorController';

import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

const swaggerFile = (process.cwd()+"/swagger.json");
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

dotenv.config()

// Create a new express application instance
const app: express.Application = express();

//enable all cors
app.use(cors())

// support application/json type post data
app.use(express.json());
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/api/',routes);
app.use('/',HTTPErrorController.HTTPError);

// The port the express app will listen on
const port = process.env.PORT || 3000;

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});