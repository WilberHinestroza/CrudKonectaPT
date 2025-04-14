import db from '../db.js';

export const getRequests = async (req, res) => {
  try {
    const result = await db('solicitud as s')
      .join('empleado as e', 's.id_empleado', 'e.id')
      .select(
        's.id',
        's.codigo',
        's.descripcion',
        's.resumen',
        'e.nombre as empleado'
      );
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las solicitudes' });
  }
};

export const addRequest = async (req, res) => {
  const { codigo, descripcion, resumen, id_empleado } = req.body;

  try {
    await db('solicitud').insert({
      codigo,
      descripcion,
      resumen,
      id_empleado
    });

    return res.status(201).json({ message: 'Solicitud creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await db('solicitud').where({ id }).del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const { codigo, descripcion, resumen, id_empleado } = req.body;

  try {
    const updatedRows = await db('solicitud')
      .where({ id })
      .update({ codigo, descripcion, resumen, id_empleado });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    return res.status(200).json({ message: 'Solicitud actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};


