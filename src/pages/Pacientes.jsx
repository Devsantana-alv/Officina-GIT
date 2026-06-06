import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPacientes } from "../services/pacientesService";

function Pacientes() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const pacientes = listarPacientes({ search, status });

  return (
    <main className="page">
      <section className="panel">
        <div className="panel-header">
          <div>
            <span className="eyebrow">SIGTEA</span>
            <h1>Pacientes</h1>
            <p>Listagem de pacientes cadastrados no sistema.</p>
          </div>

          <button onClick={() => navigate("/dashboard")}>
            Voltar
          </button>
        </div>

        <div className="filters">
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
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="waiting">Lista de espera</option>
          </select>
        </div>

        <div className="patients-list">
          {pacientes.map((paciente) => (
            <article className="patient-card" key={paciente.id}>
              <h3>{paciente.name}</h3>

              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de nascimento:</strong> {paciente.birth_date}</p>
              <p><strong>Responsável:</strong> {paciente.responsible_name}</p>
              <p><strong>Contato:</strong> {paciente.responsible_contact}</p>
              <p><strong>Convênio:</strong> {paciente.health_insurance}</p>
              <p><strong>Nível TEA:</strong> {paciente.autism_level}</p>
              <p><strong>Status:</strong> {paciente.status}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Pacientes;