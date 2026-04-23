import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function TarefasTodas() {

    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        buscarTarefas();
    }, []);

    const buscarTarefas = async () => {
        try {
            const response = await fetch('http://localhost:8081/tarefas');
            const data = await response.json();
            setTarefas(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ background: '#f0f5fa', minHeight: '100vh', padding: '30px' }}>

            <Navbar />

            <div className="container mt-4">

                <div className="card shadow p-4">

                    <h3 className="mb-4 text-center">Todas as Tarefas</h3>

                    <table className="table table-hover">
                        <thead style={{ background: '#212529', color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Status</th>
                                <th>Projeto</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tarefas.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Nenhuma tarefa cadastrada
                                    </td>
                                </tr>
                            ) : (
                                tarefas.map((t) => (
                                    <tr key={t.idTarefa}>
                                        <td>{t.idTarefa}</td>
                                        <td>{t.descricao}</td>

                                        <td>
                                            <span className={
                                                t.status === 'PENDENTE'
                                                    ? 'badge bg-secondary'
                                                    : t.status === 'FAZENDO'
                                                    ? 'badge bg-warning text-dark'
                                                    : 'badge bg-success'
                                            }>
                                                {t.status}
                                            </span>
                                        </td>

                                        <td>{t.projeto?.nome}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}

export default TarefasTodas;