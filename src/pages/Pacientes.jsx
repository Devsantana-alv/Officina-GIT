import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPacientes } from "../services/pacientesService";

function Pacientes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const pacientes = listarPacientes({ search, status });

  return (
    <div className="page-container">
      <nav className="main-nav">
        <button onClick={() => navigate("/login")} className="button-link">
          Login
        </button>

        <button onClick={() => navigate("/dashboard")} className="button-link">
          Dashboard
        </button>

        <button className="active">
          Pacientes
        </button>
      </nav>

      <main className="page-card pacientes-card">
        <span className="page-tag">PACIENTES</span>

        <div className="pacientes-header">
          <div>
            <h1>Pacientes</h1>
            <p>Listagem de pacientes cadastrados no sistema.</p>
          </div>
        </div>

        <div className="pacientes-filtros">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Ativo">Ativos</option>
            <option value="Inativo">Inativos</option>
            <option value="Aguardando">Lista de espera</option>
          </select>
        </div>

        <div className="pacientes-lista">
          {pacientes.map((paciente) => (
            <div className="paciente-item" key={paciente.id}>
              <h3>{paciente.name}</h3>

              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de nascimento:</strong> {paciente.birth_date}</p>
              <p><strong>Responsável:</strong> {paciente.responsible_name}</p>
              <p><strong>Contato:</strong> {paciente.responsible_contact}</p>
              <p><strong>Convênio:</strong> {paciente.health_insurance}</p>
              <p><strong>Nível TEA:</strong> {paciente.autism_level}</p>
              <p><strong>Status:</strong> {paciente.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Pacientes;