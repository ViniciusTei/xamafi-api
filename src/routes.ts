import {Router} from 'express';
import { MoviesController } from './Controllers/MoviesController';
import { UserController } from './Controllers/UserController';
import { HTTPErrorController} from './Controllers/ErrorController';

const router = Router();

router.get('/Users', UserController.getUsers)

router.get('/Movies/Categorie', MoviesController.getAllByCategorie)

router.get('/Movies', MoviesController.getMovies)
router.get('/Movies/:id', MoviesController.getById)

router.post('/Movies', MoviesController.createMovie)

router.get('*/**', HTTPErrorController.HTTPError)

export default router