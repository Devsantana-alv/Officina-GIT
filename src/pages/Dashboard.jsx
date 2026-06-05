import MainNav from '../components/MainNav';

export default function Dashboard() {
  return (
    <main className="page-container">
      <MainNav />
      <section className="page-card">
        <span className="page-tag">Painel</span>
        <h1>Dashboard</h1>
        <p>Resumo inicial do acompanhamento dos usuários do SIGTEA.</p>
      </section>
    </main>
  );
}
