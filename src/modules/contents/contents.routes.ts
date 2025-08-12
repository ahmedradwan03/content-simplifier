import { Router } from 'express';
import { createContentJob, getContentResult,getContentById } from './contents.controller';
import { isAuthenticated } from '../../middleware/authentication.middleware';

const router = Router();

router.post('/', isAuthenticated, createContentJob);
router.get('/', isAuthenticated, getContentResult);
router.get('/:id', isAuthenticated, getContentById);

export default router;
