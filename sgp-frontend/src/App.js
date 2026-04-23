import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Projetos from './pages/Projetos';
import Recuperar from './pages/Recuperar';
import Dashboard from './pages/Dashboard';

import Tarefas from './pages/Tarefas';
import Usuarios from './pages/Usuarios';
import TarefasTodas from './pages/TarefasTodas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* 👈 NOVO */}
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="/tarefas/:id" element={<Tarefas />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/tarefas" element={<TarefasTodas />} />
    </Routes>
  );
}

export default App;