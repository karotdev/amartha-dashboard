import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WizardPage from './features/wizard';
import EmployeesPage from './features/employees';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wizard" element={<WizardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="*" element={<Navigate to="/wizard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
