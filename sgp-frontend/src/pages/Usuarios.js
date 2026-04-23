
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('ATIVO');
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const buscarUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8081/usuarios');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
        }
    };

    const criarUsuario = async () => {
    if (!nome || !email) {
        alert("Preencha os campos");
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome,
                email,
                status,
                descricao: "Usuário do sistema",
                senha: "123456",
                dataNascimento: "2000-01-01"
            })
        });

        if (!response.ok) {
            const erro = await response.text();
            console.error("Erro:", erro);
            alert("Erro ao salvar usuário");
            return;
        }

        alert("Usuário criado!");

        limparCampos();
        buscarUsuarios();

    } catch (error) {
        console.error(error);
        alert("Erro de conexão");
    }
};

    const selecionarUsuario = (u) => {
        setIdUsuario(u.idUsuario);
        setNome(u.nome);
        setEmail(u.email);
        setStatus(u.status);
    };

    const atualizarUsuario = async () => {
        await fetch('http://localhost:8081/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idUsuario,
                nome,
                email,
                status
            })
        });

        limparCampos();
        buscarUsuarios();
    };

    const deletarUsuario = async (id) => {
        if (!window.confirm("Deseja excluir este usuário?")) return;

        await fetch(`http://localhost:8081/usuarios/${id}`, {
            method: 'DELETE'
        });

        buscarUsuarios();
    };

    const limparCampos = () => {
        setIdUsuario(null);
        setNome('');
        setEmail('');
        setStatus('ATIVO');
    };

   return (
    <Layout>

        <h3 className="mb-4 text-center">Usuários Cadastrados</h3>

        {/* FORM */}
        <div className="row mb-4">

            <div className="col-md-4 col-sm-12 mb-2">
                <input
                    className="form-control"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="col-md-4 col-sm-12 mb-2">
                <input
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="col-md-2 col-sm-12 mb-2">
                <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="ATIVO">ATIVO</option>
                    <option value="INATIVO">INATIVO</option>
                </select>
            </div>

            <div className="col-md-2 col-sm-12 mb-2">
                {idUsuario ? (
                    <button className="btn btn-warning w-100" onClick={atualizarUsuario}>
                        Atualizar
                    </button>
                ) : (
                    <button className="btn btn-success w-100" onClick={criarUsuario}>
                        + Novo
                    </button>
                )}
            </div>

        </div>

        {/* TABELA */}
        <table className="table mt-3" style={{ background: 'white', borderRadius: '10px' }}>
            <thead style={{ background: '#2c3e50', color: 'white' }}>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>

            <tbody>
                {usuarios.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">
                            Nenhum usuário cadastrado
                        </td>
                    </tr>
                ) : (
                    usuarios.map((u, index) => (
                        <tr
                            key={u.idUsuario}
                            style={{
                                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f2f2f2'
                            }}
                        >
                            <td>{u.idUsuario}</td>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>

                            <td>
                                <span className={
                                    u.status === 'ATIVO'
                                        ? 'badge bg-success'
                                        : 'badge bg-secondary'
                                }>
                                    {u.status}
                                </span>
                            </td>

                            <td>
                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => selecionarUsuario(u)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deletarUsuario(u.idUsuario)}
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

export default Usuarios;