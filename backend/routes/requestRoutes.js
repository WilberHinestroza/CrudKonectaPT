import express from 'express';
import { getRequests, addRequest, deleteRequest } from '../controller/requestController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getRequests);
router.post('/', authenticateToken, addRequest);
router.delete('/:id', authenticateToken, deleteRequest);

export default router;