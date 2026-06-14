import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    info_comorbidades: {},
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
      const novosDados = { ...dadosAtuais, [campo]: valor };
      if (campo === "status_clinico" && valor === "Suspeita") novosDados.nivel_suporte = "";
      if (campo === "status_cadastro" && valor === "Aguardando") novosDados.em_lista_espera = true;
      if (campo === "status_cadastro" && valor !== "Aguardando") novosDados.em_lista_espera = false;
      return novosDados;
    });
  };

  const handleCpf = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 11);
    const mask = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    atualizarCampo("cpf", mask);
  };

  const handleContato = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 11);
    const mask = v.length <= 10
      ? v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
      : v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
    atualizarCampo("contato", mask);
  };

  const handleCns = (e) => atualizarCampo("num_cns", e.target.value.replace(/\D/g, "").slice(0, 15));
  const handleCep = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 8);
    atualizarCampo("cep", v.replace(/(\d{5})(\d)/, "$1-$2"));
  };

  const alterarComorbidade = (comorbidade) => {
    setPaciente((dadosAtuais) => {
      const jaExiste = dadosAtuais.comorbidades.includes(comorbidade);
      const novasInfos = { ...dadosAtuais.info_comorbidades };
      if (jaExiste) {
        delete novasInfos[comorbidade];
      } else {
        novasInfos[comorbidade] = { cid: "", grau: "", data_diagnostico: "", observacoes: "" };
      }
      return {
        ...dadosAtuais,
        comorbidades: jaExiste
          ? dadosAtuais.comorbidades.filter((item) => item !== comorbidade)
          : [...dadosAtuais.comorbidades, comorbidade],
        info_comorbidades: novasInfos
      };
    });
  };

  const atualizarInfoComorbidade = (comorbidade, campo, valor) => {
    setPaciente((dadosAtuais) => ({
      ...dadosAtuais,
      info_comorbidades: {
        ...dadosAtuais.info_comorbidades,
        [comorbidade]: { ...dadosAtuais.info_comorbidades[comorbidade], [campo]: valor }
      }
    }));
  };

  const adicionarAnexo = () => setAnexos([...anexos, { tipo_documento: "", arquivo_url: "" }]);
  const atualizarAnexo = (index, campo, valor) => {
    const novosAnexos = [...anexos];
    novosAnexos[index][campo] = valor;
    setAnexos(novosAnexos);
  };

  const salvar = () => {
    const pacienteParaSalvar = {
      ...paciente,
      cpf: paciente.cpf.replace(/\D/g, ""),
      contato: paciente.contato.replace(/\D/g, ""),
      cep: paciente.cep.replace(/\D/g, "")
    };
    const resultado = criarPaciente(pacienteParaSalvar, anexos);
    if (!resultado.sucesso) { setErros(resultado.erros); return; }
    alert("Paciente cadastrado com sucesso.");
    navigate("/pacientes");
  };

  const comorbidadesDisponiveis = ["TDAH", "TOD", "Deficiência Intelectual", "Ansiedade", "Epilepsia"];

  return (
    <div className="page-container">
      <nav className="main-nav">
        <button onClick={() => navigate("/login")} className="button-link">Login</button>
        <button onClick={() => navigate("/cadastro")} className="button-link">Cadastro</button>
        <button onClick={() => navigate("/dashboard")} className="button-link">Dashboard</button>
        <button onClick={() => navigate("/pacientes")} className="button-link">Pacientes</button>
      </nav>
      <main className="page-card pacientes-card">
        <span className="page-tag">NOVO PACIENTE</span>
        <h1>Cadastrar Paciente</h1>
        <p>Preencha os dados administrativos do paciente.</p>
        {erros.length > 0 && (
          <div className="erros-box">
            {erros.map((erro, index) => <p key={index}>{erro}</p>)}
          </div>
        )}
        <div className="form-grid">
          <div className="form-group">
            <label>Nome completo</label>
            <input value={paciente.nome_completo} onChange={(e) => atualizarCampo("nome_completo", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Sexo</label>
            <select value={paciente.sexo} onChange={(e) => atualizarCampo("sexo", e.target.value)}>
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input placeholder="000.000.000-00" value={paciente.cpf} onChange={handleCpf} inputMode="numeric" maxLength="14" />
          </div>
          <div className="form-group">
            <label>Data de nascimento</label>
            <input type="date" value={paciente.data_nascimento} onChange={(e) => atualizarCampo("data_nascimento", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Cartão Nacional de Saúde</label>
            <input placeholder="15 dígitos" value={paciente.num_cns} onChange={handleCns} inputMode="numeric" maxLength="15" />
          </div>
          <div className="form-group">
            <label>Responsável</label>
            <input value={paciente.nome_responsavel} onChange={(e) => atualizarCampo("nome_responsavel", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Contato</label>
            <input placeholder="(00) 00000-0000" value={paciente.contato} onChange={handleContato} inputMode="numeric" maxLength="15" />
          </div>
          <div className="form-group">
            <label>Convênio ID</label>
            <input value={paciente.convenio_id} onChange={(e) => atualizarCampo("convenio_id", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Status clínico</label>
            <select value={paciente.status_clinico} onChange={(e) => atualizarCampo("status_clinico", e.target.value)}>
              <option value="Cadastro">Cadastro</option>
              <option value="Suspeita">Suspeita</option>
              <option value="Diagnosticado">Diagnosticado</option>
              <option value="Atendimento">Atendimento</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nível de suporte</label>
            <select value={paciente.nivel_suporte} disabled={paciente.status_clinico === "Suspeita"} onChange={(e) => atualizarCampo("nivel_suporte", e.target.value)}>
              <option value="">Selecione</option>
              <option value="1">Nível 1</option>
              <option value="2">Nível 2</option>
              <option value="3">Nível 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status do cadastro</label>
            <select value={paciente.status_cadastro} onChange={(e) => atualizarCampo("status_cadastro", e.target.value)}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Aguardando">Aguardando - Lista de Espera</option>
            </select>
          </div>
          <div className="form-group">
            <label>Logradouro</label>
            <input value={paciente.logradouro} onChange={(e) => atualizarCampo("logradouro", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Número</label>
            <input value={paciente.numero} onChange={(e) => atualizarCampo("numero", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Bairro</label>
            <input value={paciente.bairro} onChange={(e) => atualizarCampo("bairro", e.target.value)} />
          </div>
          <div className="form-group">
            <label>CEP</label>
            <input placeholder="00000-000" value={paciente.cep} onChange={handleCep} inputMode="numeric" maxLength="9" />
          </div>
          <div className="form-group">
            <label>Município</label>
            <input value={paciente.municipio} onChange={(e) => atualizarCampo("municipio", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <input maxLength="2" placeholder="GO" value={paciente.estado} onChange={(e) => atualizarCampo("estado", e.target.value.toUpperCase())} />
          </div>
        </div>

        <div className="form-group" style={{marginTop: "1.5rem"}}>
          <label style={{fontWeight: "600", fontSize: "1rem"}}>Selecionar Deficiência</label>
          <p style={{fontSize: "0.85rem", color: "#6b7280", marginBottom: "0.75rem"}}>Ao marcar uma deficiência, preencha as informações e elas serão salvas junto ao paciente.</p>
          <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
            {comorbidadesDisponiveis.map((comorbidade) => (
              <div key={comorbidade} style={{border: "1.5px solid #e5e7eb", borderRadius: "8px", padding: "0.75rem 1rem", background: paciente.comorbidades.includes(comorbidade) ? "#f0fdf4" : "#fff"}}>
                <label style={{display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontWeight: "500", fontSize: "0.95rem"}}>
                  <input
                    type="checkbox"
                    checked={paciente.comorbidades.includes(comorbidade)}
                    onChange={() => alterarComorbidade(comorbidade)}
                    style={{width: "17px", height: "17px", cursor: "pointer", accentColor: "#1a6b4a"}}
                  />
                  {comorbidade}
                </label>
                {paciente.comorbidades.includes(comorbidade) && (
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #d1fae5"}}>
                    <div className="form-group">
                      <label>CID</label>
                      <input placeholder="Ex: F90.0" value={paciente.info_comorbidades[comorbidade]?.cid || ""} onChange={(e) => atualizarInfoComorbidade(comorbidade, "cid", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Grau</label>
                      <select value={paciente.info_comorbidades[comorbidade]?.grau || ""} onChange={(e) => atualizarInfoComorbidade(comorbidade, "grau", e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="Leve">Leve</option>
                        <option value="Moderado">Moderado</option>
                        <option value="Grave">Grave</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Data do diagnóstico</label>
                      <input type="date" value={paciente.info_comorbidades[comorbidade]?.data_diagnostico || ""} onChange={(e) => atualizarInfoComorbidade(comorbidade, "data_diagnostico", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Observações</label>
                      <input placeholder="Observações adicionais" value={paciente.info_comorbidades[comorbidade]?.observacoes || ""} onChange={(e) => atualizarInfoComorbidade(comorbidade, "observacoes", e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="anexos-area">
          <div className="pacientes-header">
            <div>
              <h2>Anexos</h2>
              <p>Adicione documentos como Laudo, CPF, Encaminhamento e Comprovante.</p>
            </div>
            <button onClick={adicionarAnexo}>Adicionar Anexo</button>
          </div>
          {anexos.map((anexo, index) => (
            <div className="anexo-item" key={index}>
              <select value={anexo.tipo_documento} onChange={(e) => atualizarAnexo(index, "tipo_documento", e.target.value)}>
                <option value="">Tipo de documento</option>
                <option value="Laudo">Laudo</option>
                <option value="CPF">CPF</option>
                <option value="Comprovante de Endereço">Comprovante de Endereço</option>
                <option value="Encaminhamento">Encaminhamento</option>
                <option value="M-Chat">M-Chat</option>
              </select>
              <input placeholder="Nome do arquivo ou URL" value={anexo.arquivo_url} onChange={(e) => atualizarAnexo(index, "arquivo_url", e.target.value)} />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button onClick={salvar}>Salvar Paciente</button>
          <button onClick={() => navigate("/pacientes")} className="button-link">Cancelar</button>
        </div>
      </main>
    </div>
  );
}
export default NovoPaciente;