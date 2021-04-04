import {Router} from 'express';
import { MoviesController } from './Controllers/MoviesController';
import {UserController} from './Controllers/UserController';

const router = Router();

router.get('/users', UserController.getUsers)

router.get('/movies', MoviesController.getMovies)
router.get('/movies/:id', MoviesController.getById)
router.post('/movies', MoviesController.createMovie)

export default router