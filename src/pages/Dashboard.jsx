import MainNav from "../components/MainNav";

function Dashboard() {
  return (
    <div className="page-container">
      <MainNav />

      <main className="page-card">
        <span className="page-tag">PAINEL</span>

        <h1>Dashboard</h1>

        <p>
          Resumo inicial do acompanhamento dos usuários do SIGTEA.
        </p>
      </main>
    </div>
  );
}

export default Dashboard;
