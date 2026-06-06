import { listarPacientes } from "../services/pacientesService";

function Pacientes() {
  const pacientes = listarPacientes();

  return (
    <div>
      <h1>Pacientes</h1>

      {pacientes.map((paciente) => (
        <div key={paciente.id}>
          <p>Nome: {paciente.nome}</p>
          <p>CPF: {paciente.cpf}</p>
          <p>Data Nascimento: {paciente.dataNascimento}</p>
        </div>
      ))}
    </div>
  );
}

export default Pacientes;