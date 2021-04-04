import {Router} from 'express';
import { resourceLimits } from 'node:worker_threads';
import { MoviesController } from './Controllers/MoviesController';
import {UserController} from './Controllers/UserController';

const router = Router();

router.get('/Users', UserController.getUsers)

router.get('/Movies', MoviesController.getTrending)

export default router