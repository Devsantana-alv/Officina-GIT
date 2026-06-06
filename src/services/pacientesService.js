import { pacientesMock } from "../mocks/pacientesMock";

let pacientes = [...pacientesMock];

export const listarPacientes = () => {
  return pacientes;
};

export const cadastrarPaciente = (novoPaciente) => {
  const paciente = {
    id: pacientes.length + 1,
    ...novoPaciente
  };

  pacientes.push(paciente);

  return paciente;
};