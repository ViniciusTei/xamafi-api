import {Router} from 'express';
import {UserController} from './Controllers/UserController';

const router = Router();

let routes = router.get('/', UserController.getAllUsers)

export default routes