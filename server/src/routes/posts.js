import { Router } from 'express';
import { getCategories, getPostById, getPosts } from '../controllers/postsController.js';
import { validateParams, validateQuery } from '../middlewares/validate.js';
import { idParamSchema, postsQuerySchema } from '../utils/validators.js';

const router = Router();

router.get('/', validateQuery(postsQuerySchema), getPosts);
router.get('/categories', getCategories);
router.get('/:id', validateParams(idParamSchema), getPostById);

export default router;
