import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Typography } from '@mui/material'

const RequestList = ({ handleNewRequest }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/requests', {
        headers: {
          Authorization: 'Bearer fakeToken123',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al cargar las solicitudes');
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [handleNewRequest]);

  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta solicitud?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/requests/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer fakeToken123',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la solicitud');
      }

      // Actualiza la lista de solicitudes luego de eliminar
      setRequests(requests.filter(req => req.id !== id));
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
        <Typography variant='h4'>Lista de Solicitudes</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Empleado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay solicitudes registrados
                  </TableCell>
                </TableRow>
              ) : (requests.map(req => (
                <TableRow key={req.id}>
                  <TableCell>{req.codigo}</TableCell>
                  <TableCell>{req.descripcion}</TableCell>
                  <TableCell>{req.empleado}</TableCell>
                  <TableCell>
                    <Button variant='contained' color='error' onClick={() => deleteRequest(req.id)}>
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

export default RequestList;

