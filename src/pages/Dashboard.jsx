import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <nav className="main-nav">
        <button onClick={() => navigate("/login")} className="button-link">
          Login
        </button>

        <button onClick={() => navigate("/cadastro")} className="button-link">
          Cadastro
        </button>

        <button className="active">
          Dashboard
        </button>

        <button onClick={() => navigate("/pacientes")} className="button-link">
          Pacientes
        </button>
      </nav>

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