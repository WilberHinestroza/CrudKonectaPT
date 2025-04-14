import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'wilberhistery23',
    database: 'CrudKonecta',
    port: 5432
  },
  pool: { min: 0, max: 10 }
});

export const closeConnection = async () => {
  try {
    await db.destroy();
    console.log('Conexión a la base de datos cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
  }
};

export default db;