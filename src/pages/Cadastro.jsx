import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <nav className="main-nav">
        <button onClick={() => navigate("/login")} className="button-link">
          Login
        </button>

        <button className="active">
          Cadastro
        </button>

        <button onClick={() => navigate("/dashboard")} className="button-link">
          Dashboard
        </button>

        <button onClick={() => navigate("/pacientes")} className="button-link">
          Pacientes
        </button>
      </nav>

      <main className="page-card">
        <span className="page-tag">SIGTEA</span>

        <h1>Cadastro</h1>

        <p>
          Cadastre um novo usuário para acessar o sistema.
        </p>

        <div className="form-group">
          <label>Nome</label>
          <input type="text" placeholder="Digite seu nome" />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input type="email" placeholder="Digite seu e-mail" />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>

        <button onClick={() => navigate("/login")}>
          Cadastrar
        </button>
      </main>
    </div>
  );
}

export default Cadastro;