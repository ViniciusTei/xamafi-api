import {Router} from 'express';
import { MoviesController } from './Controllers/MoviesController';
import { UserController } from './Controllers/UserController';

const router = Router();

router.get('/Users', UserController.getUsers)

router.get('/Movies', MoviesController.getMovies)
router.get('/Movies/:id', MoviesController.getById)
router.get('/Movies/GetByCategorie', MoviesController.getAllByCategorie)

router.post('/Movies', MoviesController.createMovie)

// router.get('/*', (req, res) => {
//     res.status(404).send({
//         status: 404,
//         error: 'Not found'
//     })
// })

export default router