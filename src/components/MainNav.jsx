import { NavLink } from 'react-router-dom';

export default function MainNav() {
  const getClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className="main-nav">
      <NavLink to="/login" className={getClass}>Login</NavLink>
      <NavLink to="/cadastro" className={getClass}>Cadastro</NavLink>
      <NavLink to="/dashboard" className={getClass}>Dashboard</NavLink>
      <NavLink to="/pacientes" className={getClass}>Pacientes</NavLink>
    </nav>
  );
}
