import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Cadastro from "../pages/Cadastro";
import NotFound from '../pages/NotFound';
import Pacientes from '../pages/Pacientes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
