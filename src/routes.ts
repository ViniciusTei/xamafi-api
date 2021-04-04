import {Router} from 'express';
import { resourceLimits } from 'node:worker_threads';
import { MoviesController } from './Controllers/MoviesController';
import {UserController} from './Controllers/UserController';

const router = Router();

router.get('/users', UserController.getUsers)

router.get('/movies', MoviesController.getTrending)
router.get('/movies/id', MoviesController.getById)

export default router