import express from 'express';
import controller from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', controller.index);

router.post('/create', controller.create);

router.put('/update/:id', controller.update);

router.get('/:id', controller.getById);
export default router;
