import { Link } from 'react-router-dom';
import MainNav from '../components/MainNav';

export default function NotFound() {
  return (
    <main className="page-container">
      <MainNav />
      <section className="page-card">
        <span className="page-tag">Erro 404</span>
        <h1>Página não encontrada</h1>
        <p>A rota acessada não existe no SIGTEA.</p>
        <Link to="/login" className="button-link">
          Voltar para o login
        </Link>
      </section>
    </main>
  );
}
