import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      <MainNav />

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
