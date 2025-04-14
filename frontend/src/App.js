import React from 'react';
import EmployeeForm from './components/EmployeeForm';
import RequestForm from './components/RequestForm';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <>
      <Box sx={{justifyContent: 'center', display: 'flex'}}><Typography variant='h1'>Prueba Tecnica</Typography></Box>
      <EmployeeForm />
      <RequestForm />
    </>
  );
}

export default App;