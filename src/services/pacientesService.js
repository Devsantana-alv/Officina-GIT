import {
  buscarPacientesStorage,
  salvarPacientesStorage,
  buscarAnexosStorage,
  salvarAnexosStorage
} from "../storage/pacientesStorage";

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return 0;

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

const validarPaciente = (paciente, anexos = []) => {
  const erros = [];

  if (!paciente.nome_completo) {
    erros.push("O nome completo é obrigatório.");
  }

  if (!paciente.sexo) {
    erros.push("O sexo é obrigatório.");
  }

  if (!paciente.cpf || paciente.cpf.length !== 11) {
    erros.push("O CPF é obrigatório e deve conter 11 números.");
  }

  if (!paciente.data_nascimento) {
    erros.push("A data de nascimento é obrigatória.");
  }

  if (paciente.data_nascimento) {
    const hoje = new Date();
    const nascimento = new Date(paciente.data_nascimento);

    if (nascimento > hoje) {
      erros.push("A data de nascimento não pode ser futura.");
    }
  }

  if (!paciente.num_cns || paciente.num_cns.length !== 15) {
    erros.push("O Cartão Nacional de Saúde deve conter 15 dígitos.");
  }

  if (!paciente.contato) {
    erros.push("O contato é obrigatório.");
  }

  if (!paciente.municipio) {
    erros.push("O município é obrigatório.");
  }

  const idade = calcularIdade(paciente.data_nascimento);

  if (idade < 18 && !paciente.nome_responsavel) {
    erros.push("Para pacientes menores de 18 anos, o responsável é obrigatório.");
  }

  if (paciente.status_clinico === "Diagnosticado") {
    if (!paciente.nivel_suporte) {
      erros.push("Para pacientes diagnosticados, o nível de suporte é obrigatório.");
    }

    const possuiLaudo = anexos.some(
      (anexo) => anexo.tipo_documento === "Laudo"
    );

    if (!possuiLaudo) {
      erros.push("Para pacientes diagnosticados, o laudo é obrigatório.");
    }
  }

  if (paciente.status_clinico === "Atendimento") {
    const documentosObrigatorios = [
      "Encaminhamento",
      "CPF",
      "Comprovante de Endereço"
    ];

    documentosObrigatorios.forEach((documento) => {
      const possuiDocumento = anexos.some(
        (anexo) => anexo.tipo_documento === documento
      );

      if (!possuiDocumento) {
        erros.push(`Para atendimento, o documento ${documento} é obrigatório.`);
      }
    });
  }

  return erros;
};

export const listarPacientes = ({ search = "", status = "" } = {}) => {
  const pacientes = buscarPacientesStorage();

  return pacientes.filter((paciente) => {
    const busca = search.toLowerCase();

    const correspondeBusca =
      paciente.nome_completo.toLowerCase().includes(busca) ||
      paciente.cpf.includes(search);

    const correspondeStatus =
      status === "" || paciente.status_cadastro === status;

    return correspondeBusca && correspondeStatus;
  });
};

export const buscarPacientePorId = (id) => {
  const pacientes = buscarPacientesStorage();

  return pacientes.find((paciente) => paciente.id === id);
};

export const listarAnexosPorPaciente = (pacienteId) => {
  const anexos = buscarAnexosStorage();

  return anexos.filter((anexo) => anexo.paciente_id === pacienteId);
};

export const criarPaciente = (dadosPaciente, anexosPaciente = []) => {
  const pacientes = buscarPacientesStorage();

  const cpfJaExiste = pacientes.some(
    (paciente) => paciente.cpf === dadosPaciente.cpf
  );

  if (cpfJaExiste) {
    return {
      sucesso: false,
      erros: ["Já existe um paciente cadastrado com este CPF."]
    };
  }

  const novoPaciente = {
    id: crypto.randomUUID(),
    ...dadosPaciente
  };

  if (novoPaciente.status_clinico === "Suspeita") {
    novoPaciente.nivel_suporte = "";
  }

  const anexosFormatados = anexosPaciente.map((anexo) => ({
    id: crypto.randomUUID(),
    paciente_id: novoPaciente.id,
    tipo_documento: anexo.tipo_documento,
    arquivo_url: anexo.arquivo_url,
    data_upload: new Date().toISOString().split("T")[0]
  }));

  const erros = validarPaciente(novoPaciente, anexosFormatados);

  if (erros.length > 0) {
    return {
      sucesso: false,
      erros
    };
  }

  pacientes.push(novoPaciente);
  salvarPacientesStorage(pacientes);

  const anexosAtuais = buscarAnexosStorage();
  salvarAnexosStorage([...anexosAtuais, ...anexosFormatados]);

  console.log(`Paciente ${novoPaciente.nome_completo} cadastrado com sucesso.`);

  return {
    sucesso: true,
    paciente: novoPaciente
  };
};