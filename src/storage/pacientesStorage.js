import { pacientesMock } from "../mocks/pacientesMock";
import { pacientesAnexosMock } from "../mocks/pacientesAnexosMock";

const CHAVE_PACIENTES = "pacientes";
const CHAVE_ANEXOS = "pacientes_anexos";

export const iniciarPacientesStorage = () => {
  const pacientesSalvos = localStorage.getItem(CHAVE_PACIENTES);
  const anexosSalvos = localStorage.getItem(CHAVE_ANEXOS);

  if (!pacientesSalvos) {
    localStorage.setItem(CHAVE_PACIENTES, JSON.stringify(pacientesMock));
  }

  if (!anexosSalvos) {
    localStorage.setItem(CHAVE_ANEXOS, JSON.stringify(pacientesAnexosMock));
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

export const buscarAnexosStorage = () => {
  iniciarPacientesStorage();

  const anexos = localStorage.getItem(CHAVE_ANEXOS);
  return JSON.parse(anexos);
};

export const salvarAnexosStorage = (anexos) => {
  localStorage.setItem(CHAVE_ANEXOS, JSON.stringify(anexos));
};