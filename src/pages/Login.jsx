import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      <nav className="main-nav">
        <button className="active">Login</button>

        <button onClick={() => navigate("/cadastro")} className="button-link">
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

        <h1>Login</h1>

        <p>
          Acesse o sistema para acompanhar pacientes e registrar atendimentos.
        </p>

        <button onClick={handleLogin}>
          Entrar
        </button>
      </main>
    </div>
  );
}

export default Login;