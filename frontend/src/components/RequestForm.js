import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";
import RequestList from './RequestList';

const validationSchema = Yup.object({
  code: Yup.string().required("El codigo es obligatorio"),
  description: Yup.string().required("La descripcion es obligatoria"),
  summary: Yup.string().required("El resumen es obligatorio"),
  employeeId: Yup.number().required("El empleado es obligatorio"),
});

const RequestForm = () => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/employees', {
      headers: { Authorization: 'Bearer fakeToken123' }
    })
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const formik = useFormik({
    initialValues: {
      code: '',
      description: '',
      summary: '',
      employeeId: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      try {
        const response = await fetch('http://localhost:3001/api/requests', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer fakeToken123',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: values.code, descripcion: values.description, resumen: values.summary, id_empleado: values.employeeId }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el solicitud');
        }

        setMessage({ text: 'Solicitud creada exitosamente', type: 'success' });
        handleNewRequest();
      } catch (error) {
        setMessage({ text: error.message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleNewRequest = () => {
    setSuccess(true);
  }

  return (
    <>
      <Box sx={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box sx={{ margin: '15px' }}>
            <Typography variant='h3' >Agregar Solicitud</Typography>
            {message.text && (
              <Box sx={{ width: '100%', height: '50px', background: message.type = 'success' ? '#d4edda' : '#f8d7da' }}>
                <Typography variant='body1' align='center'>{message.text}</Typography>
              </Box>
            )}
            <TextField sx={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
            }}
              name='code'
              type='text'
              placeholder="Codigo"
              value={formik.values.code}
              onChange={formik.handleChange}
              required
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />

            <TextField sx={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
            }}
              name='description'
              type='text'
              placeholder="Descripcion"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <TextField sx={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
            }}
              name='summary'
              type='text'
              placeholder="Resumen"
              value={formik.values.summary}
              onChange={formik.handleChange}
              required
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
            />

            <FormControl fullWidth>
              <InputLabel id='idLabel'>Seleccionar Empleado</InputLabel>
              <Select
                sx={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
                labelId='idLabel'
                name='employeeId'
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                required
                error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                helperText={formik.touched.employeeId && formik.errors.employeeId}>
                {employees.map(emp => (
                  <MenuItem key={emp.id} value={emp.id}>{emp.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Box>

          </Box>
        </Box>
      </Box>
      <RequestList handleNewRequest={success} />
    </>
  );
};
export default RequestForm;