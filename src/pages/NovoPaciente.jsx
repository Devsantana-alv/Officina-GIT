import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import { criarPaciente } from "../services/pacientesService";

function NovoPaciente() {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    foto_url: "",
    nome_completo: "",
    sexo: "",
    cpf: "",
    data_nascimento: "",
    num_cns: "",
    nome_responsavel: "",
    contato: "",
    convenio_id: "",
    em_lista_espera: false,
    status_clinico: "Cadastro",
    nivel_suporte: "",
    comorbidades: [],
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    municipio: "",
    estado: "",
    status_cadastro: "Ativo"
  });

  const [anexos, setAnexos] = useState([]);
  const [erros, setErros] = useState([]);

  const atualizarCampo = (campo, valor) => {
    setPaciente((dadosAtuais) => {
      const novosDados = {
        ...dadosAtuais,
        [campo]: valor
      };

      if (campo === "status_clinico" && valor === "Suspeita") {
        novosDados.nivel_suporte = "";
      }

      if (campo === "status_cadastro" && valor === "Aguardando") {
        novosDados.em_lista_espera = true;
      }

      if (campo === "status_cadastro" && valor !== "Aguardando") {
        novosDados.em_lista_espera = false;
      }

      return novosDados;
    });
  };

  const alterarComorbidade = (comorbidade) => {
    setPaciente((dadosAtuais) => {
      const jaExiste = dadosAtuais.comorbidades.includes(comorbidade);

      return {
        ...dadosAtuais,
        comorbidades: jaExiste
          ? dadosAtuais.comorbidades.filter((item) => item !== comorbidade)
          : [...dadosAtuais.comorbidades, comorbidade]
      };
    });
  };

  const adicionarAnexo = () => {
    setAnexos([
      ...anexos,
      {
        tipo_documento: "",
        arquivo_url: ""
      }
    ]);
  };

  const atualizarAnexo = (index, campo, valor) => {
    const novosAnexos = [...anexos];
    novosAnexos[index][campo] = valor;
    setAnexos(novosAnexos);
  };

  const salvar = () => {
    const resultado = criarPaciente(paciente, anexos);

    if (!resultado.sucesso) {
      setErros(resultado.erros);
      return;
    }

    alert("Paciente cadastrado com sucesso.");
    navigate("/pacientes");
  };

  const comorbidadesDisponiveis = [
    "TDAH",
    "TOD",
    "Deficiência Intelectual",
    "Ansiedade",
    "Epilepsia"
  ];

  return (
    <div className="page-container">
      <MainNav />

      <main className="page-card pacientes-card">
        <span className="page-tag">NOVO PACIENTE</span>

        <h1>Cadastrar Paciente</h1>
        <p>Preencha os dados administrativos do paciente.</p>

        {erros.length > 0 && (
          <div className="erros-box">
            {erros.map((erro, index) => (
              <p key={index}>{erro}</p>
            ))}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label>Nome completo</label>
            <input
              value={paciente.nome_completo}
              onChange={(e) => atualizarCampo("nome_completo", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sexo</label>
            <select
              value={paciente.sexo}
              onChange={(e) => atualizarCampo("sexo", e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              maxLength="11"
              placeholder="Apenas números"
              value={paciente.cpf}
              onChange={(e) => atualizarCampo("cpf", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Data de nascimento</label>
            <input
              type="date"
              value={paciente.data_nascimento}
              onChange={(e) => atualizarCampo("data_nascimento", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Cartão Nacional de Saúde</label>
            <input
              maxLength="15"
              placeholder="15 dígitos"
              value={paciente.num_cns}
              onChange={(e) => atualizarCampo("num_cns", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Responsável</label>
            <input
              value={paciente.nome_responsavel}
              onChange={(e) => atualizarCampo("nome_responsavel", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Contato</label>
            <input
              value={paciente.contato}
              onChange={(e) => atualizarCampo("contato", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Convênio ID</label>
            <input
              value={paciente.convenio_id}
              onChange={(e) => atualizarCampo("convenio_id", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status clínico</label>
            <select
              value={paciente.status_clinico}
              onChange={(e) => atualizarCampo("status_clinico", e.target.value)}
            >
              <option value="Cadastro">Cadastro</option>
              <option value="Suspeita">Suspeita</option>
              <option value="Diagnosticado">Diagnosticado</option>
              <option value="Atendimento">Atendimento</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nível de suporte</label>
            <select
              value={paciente.nivel_suporte}
              disabled={paciente.status_clinico === "Suspeita"}
              onChange={(e) => atualizarCampo("nivel_suporte", e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="1">Nível 1</option>
              <option value="2">Nível 2</option>
              <option value="3">Nível 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status do cadastro</label>
            <select
              value={paciente.status_cadastro}
              onChange={(e) => atualizarCampo("status_cadastro", e.target.value)}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Aguardando">Aguardando - Lista de Espera</option>
            </select>
          </div>

          <div className="form-group">
            <label>Logradouro</label>
            <input
              value={paciente.logradouro}
              onChange={(e) => atualizarCampo("logradouro", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Número</label>
            <input
              value={paciente.numero}
              onChange={(e) => atualizarCampo("numero", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Bairro</label>
            <input
              value={paciente.bairro}
              onChange={(e) => atualizarCampo("bairro", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>CEP</label>
            <input
              maxLength="8"
              value={paciente.cep}
              onChange={(e) => atualizarCampo("cep", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Município</label>
            <input
              value={paciente.municipio}
              onChange={(e) => atualizarCampo("municipio", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Estado</label>
            <input
              maxLength="2"
              placeholder="GO"
              value={paciente.estado}
              onChange={(e) => atualizarCampo("estado", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Comorbidades</label>

          <div className="checkbox-list">
            {comorbidadesDisponiveis.map((comorbidade) => (
              <label key={comorbidade}>
                <input
                  type="checkbox"
                  checked={paciente.comorbidades.includes(comorbidade)}
                  disabled={paciente.status_clinico !== "Suspeita"}
                  onChange={() => alterarComorbidade(comorbidade)}
                />
                {comorbidade}
              </label>
            ))}
          </div>
        </div>

        <div className="anexos-area">
          <div className="pacientes-header">
            <div>
              <h2>Anexos</h2>
              <p>Adicione documentos como Laudo, CPF, Encaminhamento e Comprovante.</p>
            </div>

            <button onClick={adicionarAnexo}>
              Adicionar Anexo
            </button>
          </div>

          {anexos.map((anexo, index) => (
            <div className="anexo-item" key={index}>
              <select
                value={anexo.tipo_documento}
                onChange={(e) => atualizarAnexo(index, "tipo_documento", e.target.value)}
              >
                <option value="">Tipo de documento</option>
                <option value="Laudo">Laudo</option>
                <option value="CPF">CPF</option>
                <option value="Comprovante de Endereço">Comprovante de Endereço</option>
                <option value="Encaminhamento">Encaminhamento</option>
                <option value="M-Chat">M-Chat</option>
              </select>

              <input
                placeholder="Nome do arquivo ou URL"
                value={anexo.arquivo_url}
                onChange={(e) => atualizarAnexo(index, "arquivo_url", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button onClick={salvar}>
            Salvar Paciente
          </button>

          <button onClick={() => navigate("/pacientes")} className="button-link">
            Cancelar
          </button>
        </div>
      </main>
    </div>
  );
}

export default NovoPaciente;