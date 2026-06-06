import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // aqui você pode validar usuário e senha depois
    navigate("/dashboard");
  };

  return (
    <button onClick={handleLogin}>
      Entrar
    </button>
  );
}

export default Login;