import db from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await db('empleado').select('*');
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const addEmployee = async (req, res) => {
  const { nombre, fecha_ingreso, salario } = req.body;

  try {
    await db('empleado').insert({
      nombre,
      fecha_ingreso,
      salario
    });

    return res.status(201).json({ message: 'Empleado creado exitosamente' });
  } catch (error) {
    console.error('Error al crear empleado:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_ingreso, salario } = req.body;

  try {
    const updatedRows = await db('empleado')
      .where({ id })
      .update({ nombre, fecha_ingreso, salario });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    return res.status(200).json({ message: 'Empleado actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await db('empleado').where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};