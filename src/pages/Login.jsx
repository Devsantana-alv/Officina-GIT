import { useNavigate } from 'react-router-dom';
import MainNav from '../components/MainNav';

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/dashboard');
  }

  return (
    <main className="page-container">
      <MainNav />
      <section className="page-card">
        <span className="page-tag">SIGTEA</span>
        <h1>Login</h1>
        <p>Acesse o sistema para acompanhar pacientes e registrar atendimentos.</p>
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </section>
    </main>
  );
}
