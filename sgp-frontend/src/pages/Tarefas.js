import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

function Tarefas() {

    const { id } = useParams();

    const [tarefas, setTarefas] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [idTarefa, setIdTarefa] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [status, setStatus] = useState('PENDENTE'); // 🔥 NOVO

    useEffect(() => {
        buscarTarefas();
        buscarUsuarios();
    }, [id]);

    const buscarTarefas = async () => {
        try {
            const response = await fetch('http://localhost:8081/tarefas');
            const data = await response.json();

            const filtradas = data.filter(
                t => t.projeto?.idProjeto === Number(id)
            );

            setTarefas(filtradas);
        } catch (error) {
            console.error(error);
        }
    };

    const buscarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8081/usuarios');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
        }
    };

    // 🔹 CRIAR
    const criarTarefa = async () => {
        if (!descricao) {
            alert("Digite uma descrição");
            return;
        }

        try {
            const response = await fetch('http://localhost:8081/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titulo: descricao,
                    descricao: descricao,
                    status: status, // 🔥 AQUI
                    prioridade: "MEDIA",
                    dataCriacao: "2024-01-01",
                    projeto: { idProjeto: Number(id) },
                    usuarios: usuarioSelecionado
                        ? [{ idUsuario: Number(usuarioSelecionado) }]
                        : []
                })
            });

            if (!response.ok) {
                alert("Erro ao salvar");
                return;
            }

            alert("Tarefa criada!");
            limpar();
            buscarTarefas();

        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        }
    };

    // 🔹 EDITAR
    const selecionarTarefa = (t) => {
        setIdTarefa(t.idTarefa);
        setDescricao(t.descricao);
        setStatus(t.status); // 🔥 IMPORTANTE

        if (t.usuarios?.length > 0) {
            setUsuarioSelecionado(t.usuarios[0].idUsuario);
        }
    };

    // 🔹 ATUALIZAR
    const atualizarTarefa = async () => {
        try {
            const response = await fetch('http://localhost:8081/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idTarefa,
                    titulo: descricao,
                    descricao: descricao,
                    status: status, // 🔥 AQUI
                    prioridade: "MEDIA",
                    dataCriacao: "2024-01-01",
                    projeto: { idProjeto: Number(id) },
                    usuarios: usuarioSelecionado
                        ? [{ idUsuario: Number(usuarioSelecionado) }]
                        : []
                })
            });

            if (!response.ok) {
                alert("Erro ao atualizar");
                return;
            }

            alert("Atualizado!");
            limpar();
            buscarTarefas();

        } catch (error) {
            console.error(error);
            alert("Erro de conexão");
        }
    };

    const deletarTarefa = async (idTarefa) => {
        if (!window.confirm("Deseja excluir?")) return;

        await fetch(`http://localhost:8081/tarefas/${idTarefa}`, {
            method: 'DELETE'
        });

        buscarTarefas();
    };

    const limpar = () => {
        setDescricao('');
        setIdTarefa(null);
        setUsuarioSelecionado('');
        setStatus('PENDENTE'); // 🔥 reset
    };

  return (
    <Layout>

        <h4 className="mb-4">Tarefas do Projeto</h4>
        <h6 className="text-muted">Projeto ID: {id}</h6>

        {/* FORM */}
        <div className="mb-3">

            <input
                className="form-control mb-2"
                placeholder="Descrição da tarefa"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />

            <select
                className="form-control mb-2"
                value={usuarioSelecionado}
                onChange={(e) => setUsuarioSelecionado(e.target.value)}
            >
                <option value="">Selecione um usuário</option>
                {usuarios.map(u => (
                    <option key={u.idUsuario} value={u.idUsuario}>
                        {u.nome}
                    </option>
                ))}
            </select>

            <select
                className="form-control mb-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="PENDENTE">PENDENTE</option>
                <option value="FAZENDO">FAZENDO</option>
                <option value="CONCLUIDO">CONCLUÍDO</option>
            </select>

            {idTarefa ? (
                <button className="btn btn-warning" onClick={atualizarTarefa}>
                    Atualizar
                </button>
            ) : (
                <button className="btn btn-success" onClick={criarTarefa}>
                    Adicionar
                </button>
            )}

        </div>

        {/* TABELA */}
        <table clasName="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Responsável</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                {tarefas.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">
                            Nenhuma tarefa cadastrada
                        </td>
                    </tr>
                ) : (
                    tarefas.map((t) => (
                        <tr key={t.idTarefa}>
                            <td>{t.idTarefa}</td>
                            <td>{t.descricao}</td>

                            <td>
                                <span className="badge bg-secondary">
                                    {t.status}
                                </span>
                            </td>

                            <td>
                                {t.usuarios?.length > 0
                                    ? t.usuarios.map(u => u.nome).join(', ')
                                    : '—'}
                            </td>

                            <td>
                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => selecionarTarefa(t)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deletarTarefa(t.idTarefa)}
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

export default Tarefas;