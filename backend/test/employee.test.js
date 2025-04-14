import request from 'supertest';
import app from '../app.js';
import db, { closeConnection } from '../db.js';

const token = 'fakeToken123';

describe('Employee API', () => {
  afterAll(async () => {
    await closeConnection();
  });

  it('GET /api/employees → debería retornar lista de empleados', async () => {
    const res = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/employees → debería agregar un nuevo empleado', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ nombre: 'Juan Test', fecha_ingreso: '2024-01-01', salario: 2000000 });
    expect(res.statusCode).toBe(201);
  });
});