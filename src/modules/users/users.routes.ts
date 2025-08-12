import { Router } from 'express';
import { addUser, getUser, getUsers } from './users.controller';
import { allowedTo } from '../../middleware/allowTol.middelware';
import { isAuthenticated } from '../../middleware/authentication.middleware';

const router = Router();

router.get('/', isAuthenticated, allowedTo('admin'), getUsers);
router.get('/:id', isAuthenticated, allowedTo('admin'), getUser);
router.post('/', isAuthenticated, allowedTo('admin'), addUser);

export default router;
