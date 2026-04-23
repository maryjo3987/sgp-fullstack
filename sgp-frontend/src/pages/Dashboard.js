import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';



function Dashboard() {

    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    const carregar = async () => {
        const resProjetos = await axios.get('http://localhost:8081/projetos');
        const resTarefas = await axios.get('http://localhost:8081/tarefas');

        setProjetos(resProjetos.data);
        setTarefas(resTarefas.data);
    };

    // 🔹 PROJETOS
    const total = projetos.length;
    const ativos = projetos.filter(p => p.status === 'ATIVO').length;
    const cancelados = projetos.filter(p => p.status === 'CANCELADO').length;
    const concluidos = projetos.filter(p => p.status === 'CONCLUIDO').length;

    // 🔹 TAREFAS
    const totalTarefas = tarefas.length;
    const tarefasPendentes = tarefas.filter(t => t.status === 'PENDENTE').length;
    const tarefasFazendo = tarefas.filter(t => t.status === 'FAZENDO').length;
    const tarefasConcluidas = tarefas.filter(t => t.status === 'CONCLUIDO').length;

    return (
    <Layout>

        <h3 className="mb-4">Projetos</h3>

      {/* PROJETOS */}
<div className="row mb-4">

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #6c757d, #495057)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h5>Total</h5>
      <h2>{total}</h2>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #198754, #157347)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h5>Ativos</h5>
      <h2>{ativos}</h2>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #dc3545, #b02a37)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h5>Cancelados</h5>
      <h2>{cancelados}</h2>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #0d6efd, #084298)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h5>Concluídos</h5>
      <h2>{concluidos}</h2>
    </div>
  </div>

</div>

      {/* TAREFAS */}
<h3 className="mb-3">Tarefas</h3>

<div className="row">

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #6c757d, #495057)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h6>Total</h6>
      <h3>{totalTarefas}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #2403034f, #190336)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h6>Pendentes</h6>
      <h3>{tarefasPendentes}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #ffc107, #e0a800)',
        borderRadius: '15px'
      }}>
      <h6>Fazendo</h6>
      <h3>{tarefasFazendo}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card text-center shadow p-3"
      style={{
        background: 'linear-gradient(135deg, #198754, #146c43)',
        color: 'white',
        borderRadius: '15px'
      }}>
      <h6>Concluídas</h6>
      <h3>{tarefasConcluidas}</h3>
    </div>
  </div>

</div>

    </Layout>
);
}

export default Dashboard;