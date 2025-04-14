import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeList from './EmployeeList';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            nombre: 'Juan',
            fecha_ingreso: '2023-01-01',
            salario: 1500000,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('muestra empleados después de cargar', async () => {
  render(<EmployeeList />);

  // Verificamos que aparezca mensaje de carga al inicio
  expect(screen.getByText(/Cargando empleados/i)).toBeInTheDocument();

  // Esperamos a que se renderice el nombre del empleado
  await waitFor(() => {
    expect(screen.getByText('Juan')).toBeInTheDocument();
  });
});