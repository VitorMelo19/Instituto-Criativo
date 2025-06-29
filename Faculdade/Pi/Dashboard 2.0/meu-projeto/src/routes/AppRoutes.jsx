import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomeSite/Home';
import Eventos from '../pages/eventos';
import Cadastro from '../pages/cadastro';
import Dashboard from '../pages/dashboard';
import Estatisticas from '../pages/estatisticas';
import MeusEventos from '../pages/meusEventos';
import EditarCurso from '../pages/EditarCurso';
import Login from '../pages/login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/estatisticas" element={<Estatisticas />} />
      <Route path="/meus-eventos" element={<MeusEventos />} />
      <Route path="/cursos/editar/:id" element={<EditarCurso />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

