import { listarPacientes } from "../services/pacientesService";
import { useNavigate } from "react-router-dom";

function Pacientes() {
  const pacientes = listarPacientes();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          width: "700px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1>Pacientes</h1>

        {pacientes.map((paciente) => (
          <div
            key={paciente.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
            }}
          >
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>CPF:</strong> {paciente.cpf}</p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {paciente.dataNascimento}
            </p>
          </div>
        ))}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#0f766e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default Pacientes;