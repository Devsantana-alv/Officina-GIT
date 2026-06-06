import { pacientesMock } from "../mocks/pacientesMock";

const CHAVE_PACIENTES = "pacientes";

export const iniciarPacientesStorage = () => {
  const pacientesSalvos = localStorage.getItem(CHAVE_PACIENTES);

  if (!pacientesSalvos) {
    localStorage.setItem(CHAVE_PACIENTES, JSON.stringify(pacientesMock));
  }
};

export const buscarPacientesStorage = () => {
  iniciarPacientesStorage();

  const pacientes = localStorage.getItem(CHAVE_PACIENTES);

  return JSON.parse(pacientes);
};

export const salvarPacientesStorage = (pacientes) => {
  localStorage.setItem(CHAVE_PACIENTES, JSON.stringify(pacientes));
};