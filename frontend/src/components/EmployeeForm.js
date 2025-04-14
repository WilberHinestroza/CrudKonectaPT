import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup";
import EmployeeList from './EmployeeList';

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  hireDate: Yup.date().required("La fecha de ingreso es obligatoria"),
  salary: Yup.number().required("El salario es obligatorio"),
});

const EmployeeForm = () => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      hireDate: '',
      salary: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      try {
        const response = await fetch('http://localhost:3001/api/employees', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer fakeToken123',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: values.name, fecha_ingreso: values.hireDate, salario: values.salary }),
        });

        if (!response.ok) {
          throw new Error('Error al crear el empleado');
        }

        setMessage({ text: 'Empleado creado exitosamente', type: 'success' });
        handleNewEmployee();
      } catch (error) {
        setMessage({ text: error.message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleNewEmployee = () => {
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
            <Typography variant='h3' >Agregar Empleado</Typography>
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
              name='name'
              type='text'
              placeholder="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField sx={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
            }}
              name='hireDate'
              type='date'
              placeholder="Fecha ingreso"
              value={formik.values.hireDate}
              onChange={formik.handleChange}
              required
              error={formik.touched.hireDate && Boolean(formik.errors.hireDate)}
              helperText={formik.touched.hireDate && formik.errors.hireDate}
            />

            <TextField sx={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
            }}
              name='salary'
              type='number'
              placeholder="Salario"
              value={formik.values.salary}
              onChange={formik.handleChange}
              required
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <EmployeeList handleNewEmployee={success} />
    </>

  );
};

export default EmployeeForm;
