import { Navigate, Route, Routes } from 'react-router-dom';
import EmployeesPage from './features/employees';
import WizardPage from './features/wizard';

function App() {
  return (
    <Routes>
      <Route path="/wizard" element={<WizardPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="*" element={<Navigate to="/wizard" />} />
    </Routes>
  );
}

export default App;
