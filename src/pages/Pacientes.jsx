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

        <button onClick={() => navigate("/cadastro")} className="button-link">
          Cadastro
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
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Aguardando">Aguardando - Lista de Espera</option>
          </select>
        </div>

        <div className="pacientes-lista">
          {pacientes.map((paciente) => (
            <div className="paciente-item" key={paciente.id}>
              <h3>{paciente.nome_completo}</h3>

              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de nascimento:</strong> {paciente.data_nascimento}</p>
              <p><strong>Sexo:</strong> {paciente.sexo}</p>
              <p><strong>CNS:</strong> {paciente.num_cns}</p>
              <p><strong>Responsável:</strong> {paciente.nome_responsavel || "Não informado"}</p>
              <p><strong>Contato:</strong> {paciente.contato}</p>
              <p><strong>Status clínico:</strong> {paciente.status_clinico}</p>
              <p><strong>Nível de suporte:</strong> {paciente.nivel_suporte || "Não se aplica"}</p>
              <p><strong>Comorbidades:</strong> {paciente.comorbidades?.join(", ") || "Nenhuma"}</p>
              <p><strong>Endereço:</strong> {paciente.logradouro}, {paciente.numero} - {paciente.bairro}</p>
              <p><strong>Cidade:</strong> {paciente.municipio} - {paciente.estado}</p>
              <p><strong>CEP:</strong> {paciente.cep}</p>
              <p><strong>Status:</strong> {paciente.status_cadastro}</p>
            </div>
          ))}

          {pacientes.length === 0 && (
            <p>Nenhum paciente encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Pacientes;