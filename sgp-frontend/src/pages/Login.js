import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/fundo-novo.png';
import logo from '../assets/logo5.png';
import fundo from '../assets/fundo-novo2.png';
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    if (email.trim() === 'admin@email.com' && senha.trim() === '123') {
      navigate('/dashboard');
    } else {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${fundo})`,
      height: '100vh',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '350px',
        padding: '30px',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>

        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '-30px'}} />


        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="input-group mb-3">
         <input
  type={mostrarSenha ? 'text' : 'password'}
  className="form-control"
  placeholder="Senha"
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
  style={{
    borderRadius: '10px 0 0 10px',
    border: 'none',
    background: 'rgba(255,255,255,0.7)'
  }}
/>
          <button
  onClick={() => setMostrarSenha(!mostrarSenha)}
  style={{
    border: 'none',
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '0 10px 10px 0',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  👁️
</button>
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Acessar
        </button>

        <p style={{ marginTop: '10px', cursor: 'pointer' }}
           onClick={() => navigate('/recuperar')}>
          Esqueci minha senha
        </p>

      </div>
    </div>
  );
}

export default Login;