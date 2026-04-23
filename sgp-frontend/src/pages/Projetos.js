import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

function Projetos() {

    const [projetos, setProjetos] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('ATIVO');
    const [idProjeto, setIdProjeto] = useState(null);

    useEffect(() => {
        buscarProjetos();
    }, []);

    const buscarProjetos = async () => {
        const response = await axios.get('http://localhost:8081/projetos');
        setProjetos(response.data);
    };

    const criarProjeto = async () => {
        await axios.post('http://localhost:8081/projetos', {
            nome,
            descricao,
            status,
            dataInicio: '2024-01-01',
            dataConclusao: '2024-12-31'
        });

        setNome('');
        setDescricao('');
        setStatus('ATIVO');
        buscarProjetos();
    };

    const deletarProjeto = async (id) => {
        if (window.confirm("Deseja realmente excluir este projeto?")) {
            await axios.delete(`http://localhost:8081/projetos/${id}`);
            buscarProjetos();
        }
    };

    const selecionarProjeto = (p) => {
        setIdProjeto(p.idProjeto);
        setNome(p.nome);
        setDescricao(p.descricao);
        setStatus(p.status);
    };

    const atualizarProjeto = async () => {
        await axios.put(`http://localhost:8081/projetos/${idProjeto}`, {
            nome,
            descricao,
            status,
            dataInicio: '2024-01-01',
            dataConclusao: '2024-12-31'
        });

        setIdProjeto(null);
        setNome('');
        setDescricao('');
        setStatus('ATIVO');
        buscarProjetos();
    };

   return (
    <Layout>

        <h4 className="mb-4">Gestão de Projetos</h4>

        {/* FORM */}
        <div className="mb-4">
            <input
                className="form-control mb-2"
                placeholder="Nome do projeto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                className="form-control mb-2"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <select
                className="form-control mb-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="ATIVO">ATIVO</option>
                <option value="CONCLUIDO">CONCLUÍDO</option>
                <option value="CANCELADO">CANCELADO</option>
            </select>

            {idProjeto ? (
                <button className="btn btn-warning" onClick={atualizarProjeto}>
                    Atualizar Projeto
                </button>
            ) : (
                <button className="btn btn-success" onClick={criarProjeto}>
                    Criar Projeto
                </button>
            )}
        </div>

        {/* TABELA */}
       
       <table className="table mt-3" style={{ background: 'white', borderRadius: '10px' }}>
    <thead style={{ background: '#2c3e50', color: 'white' }}>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Status</th>
            <th className="text-center">Ações</th>
        </tr>
    </thead>

    <tbody>
        {projetos.length === 0 ? (
            <tr>
                <td colSpan="4" className="text-center">
                    Nenhum projeto cadastrado
                </td>
            </tr>
        ) : (
            projetos.map((p, index) => (
                <tr
                    key={p.idProjeto}
                    style={{
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2'
                    }}
                >
                    <td>{p.idProjeto}</td>
                    <td>{p.nome}</td>

                    <td>
                        <span className={
                            p.status === 'ATIVO' ? 'badge bg-success' :
                            p.status === 'CONCLUIDO' ? 'badge bg-primary' :
                            'badge bg-danger'
                        }>
                            {p.status}
                        </span>
                    </td>

                    <td className="text-center">

                        <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => window.location.href = `/tarefas/${p.idProjeto}`}
                        >
                            Tarefas
                        </button>

                        <button
                            className="btn btn-outline-warning btn-sm me-2"
                            onClick={() => selecionarProjeto(p)}
                        >
                            Editar
                        </button>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deletarProjeto(p.idProjeto)}
                        >
                            Excluir
                        </button>

                    </td>

                </tr>
            ))
        )}
    </tbody>
</table>

    </Layout>
);
}

export default Projetos;