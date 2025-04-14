import express from 'express';
import { getEmployees, addEmployee , deleteEmployee} from '../controller/employeeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getEmployees);
router.post('/', authenticateToken, addEmployee);
router.delete('/:id', authenticateToken, deleteEmployee);

export default router;