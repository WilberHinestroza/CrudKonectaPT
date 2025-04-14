import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const EmployeeList = ({ handleNewEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        headers: {
          Authorization: 'Bearer fakeToken123',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [handleNewEmployee]);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer fakeToken123',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el empleado');
      }

      // Actualiza la lista de empleados luego de eliminar
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      alert(`No se pudo eliminar: ${err.message}`);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando empleados...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <Box sx={{
        maxWidth: '700px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant='h4'>Lista de Empleados</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha de Contratación</TableCell>
                <TableCell>Salario</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay empleados registrados
                  </TableCell>
                </TableRow>
              ) : (employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.nombre}</TableCell>
                  <TableCell>{new Date(emp.fecha_ingreso).toLocaleDateString()}</TableCell>
                  <TableCell>${emp.salario.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant='contained' color='error' onClick={() => deleteEmployee(emp.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default EmployeeList;