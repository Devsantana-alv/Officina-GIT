import {
  buscarPacientesStorage,
  salvarPacientesStorage
} from "../storage/pacientesStorage";

export const listarPacientes = ({ search = "", status = "" } = {}) => {
  const pacientes = buscarPacientesStorage();

  return pacientes.filter((paciente) => {
    const busca = search.toLowerCase();

    const correspondeBusca =
      paciente.name.toLowerCase().includes(busca) ||
      paciente.cpf.includes(search);

    const correspondeStatus =
      status === "" || paciente.status === status;

    return correspondeBusca && correspondeStatus;
  });
};

export const criarPaciente = (dadosPaciente) => {
  const pacientes = buscarPacientesStorage();

  const novoPaciente = {
    id: Date.now(),
    ...dadosPaciente
  };

  pacientes.push(novoPaciente);

  salvarPacientesStorage(pacientes);

  return novoPaciente;
};