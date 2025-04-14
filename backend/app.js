import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/requests', requestRoutes);

export default app;