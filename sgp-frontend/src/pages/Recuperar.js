import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/fundo-novo2.png';
import logo from '../assets/logo5.png';

function Recuperar() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const recuperar = () => {
    if (email.trim() === 'admin@email.com') {
      setMensagem('Email enviado com sucesso!');
    } else {
      setMensagem('Email não encontrado');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        style={{
          width: '350px',
          padding: '30px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}
      >

        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '-50px' }} />

        <h5 style={{ marginBottom: '20px', color: '#1c2b36' }}>
          Recuperar Senha
        </h5>

        <input
          type="email"
          placeholder="Digite seu email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(255,255,255,0.7)'
          }}
        />

        <button
          className="btn w-100"
          onClick={recuperar}
          style={{
            borderRadius: '10px',
            background: 'linear-gradient(90deg, #22c55e, #16a34a)',
            color: '#fff',
            fontWeight: 'bold'
          }}
        >
          Enviar
        </button>

        {mensagem && (
          <p style={{ marginTop: '10px' }}>{mensagem}</p>
        )}

        <p
          style={{ marginTop: '15px', cursor: 'pointer', color: '#1c2b36' }}
          onClick={() => navigate('/')}
        >
          Voltar para login
        </p>

      </div>
    </div>
  );
}

export default Recuperar;