import {Router} from 'express';
import { resourceLimits } from 'node:worker_threads';
import {UserController} from './Controllers/UserController';

const router = Router();

let routes = router.get('/Users', UserController.getUsers)

export default routes