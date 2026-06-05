import MainNav from '../components/MainNav';

export default function Pacientes() {
  return (
    <main className="page-container">
      <MainNav />
      <section className="page-card">
        <span className="page-tag">Cadastros</span>
        <h1>Pacientes</h1>
        <p>Área inicial para listar, cadastrar e acompanhar pacientes.</p>
      </section>
    </main>
  );
}
