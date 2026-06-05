import { NavLink } from 'react-router-dom';

export default function MainNav() {
  return (
    <nav className="main-nav">
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
        Login
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
        Dashboard
      </NavLink>
      <NavLink to="/pacientes" className={({ isActive }) => (isActive ? 'active' : '')}>
        Pacientes
      </NavLink>
    </nav>
  );
}
