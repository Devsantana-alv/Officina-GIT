export const login = (usuario, senha) => {
  if (usuario === "admin" && senha === "123456") {
    localStorage.setItem("logado", "true");
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("logado");
};

export const estaLogado = () => {
  return localStorage.getItem("logado") === "true";
};