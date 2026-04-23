import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo4.png';

function Navbar() {

    const navigate = useNavigate();
    const handleLogout = () => {
        const confirmar = window.confirm("Deseja realmente sair?");

        if (confirmar) {
            navigate('/'); // volta para login
        }
    };
    return (
        <div style={{ maxWidth: '1300px', margin: '10px auto', }}>

            <div style={{
                backgroundColor: '#4f8c95',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: '50px',
                            objectFit: 'contain',
                            borderRadius: '5px',
                        }}
                    />

                    <strong style={{ color: 'white', fontSize: '16px' }}>
                        Sistema de Gestão de Projetos
                    </strong>

                </div>

                <div>
                    <button className="btn btn-outline-light me-2" onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </button>

                    <button className="btn btn-outline-light me-2" onClick={() => navigate('/projetos')}>
                        Projetos
                    </button>

                    <button className="btn btn-outline-light me-2" onClick={() => navigate('/tarefas/1')}>
                        Tarefas
                    </button>

                    <button className="btn btn-outline-light me-2" onClick={() => navigate('/usuarios')}>
                        Usuários
                    </button>

                    <button
                        className="btn btn-danger me-2"
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>

            </div>

        </div>
    );
}

export default Navbar;
