import { Routes, Route } from 'react-router-dom';

// Importando os componentes de página inicial
import Home from '../pages/Home/home';
import Login from '../pages/Home/login';
import EscolherCadastro from '../pages/Home/Escoher-Cadastro';
import Cadastro from '../pages/Home/Cadastro';

//// Importando os componentes do Dashboard do Admin
import HomeAdmin from '../pages/Dashboard-Admin/Home-Admin';
import EventosAdmin from '../pages/Dashboard-Admin/Eventos';
import Estatisticas from '../pages/Dashboard-Admin/Estatisticas';
import Acesso from "../pages/Dashboard-Admin/Acesso";
import Configuraçoes from "../pages/Dashboard-Admin/Configurações";
import Dados from "../pages/Dashboard-Admin/dados";
import Emailsenha from "../pages/Dashboard-Admin/email-senha";

// Importando os componentes do Dashboard do Aluno
import HomeAluno from "../pages/Dashboard-Aluno/Home-Aluno";
import ConfigAluno from "../pages/Dashboard-Aluno/Config-Aluno";
import EventosAluno from "../pages/Dashboard-Aluno/Eventos-Aluno";
import DadosAluno from "../pages/Dashboard-Aluno/dados-Aluno";
import EmailSenhaAluno from "../pages/Dashboard-Aluno/email-senha-aluno";

// Importando os componentes do Dashboard do Professor
import HomeProf from "../pages/Dashboard-Professor/Home-Prof";
import ConfigProf from "../pages/Dashboard-Professor/Config-Prof";
import EventosProf from "../pages/Dashboard-Professor/Eventos-Prof";
import DadosProf from "../pages/Dashboard-Professor/Dados-Prof";
import EmailSenhaProf from "../pages/Dashboard-Professor/Email-senha-prof";



// Crie o componente AppRoutes
function AppRoutes() {
  return (
    <Routes>
      // Rotas da página inicial
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/EscolherCadastro" element={<EscolherCadastro />} />
      <Route path="/Cadastro" element={<Cadastro />} />

      // Rotas do Dashboard do Admin
      <Route path="/home-admin" element={<HomeAdmin />} />
      <Route path="/eventos" element={<EventosAdmin />} />
      <Route path="/estatisticas" element={<Estatisticas />} />
      <Route path="/acesso" element={<Acesso />} />
      <Route path="/configuracoes" element={<Configuraçoes />} />
      <Route path="/dados" element={<Dados />} />
      <Route path="/email-senha" element={<Emailsenha />} />

      // Rotas do Dashboard do Aluno
      <Route path="/home-aluno" element={<HomeAluno />} />
      <Route path="/eventos-aluno" element={<EventosAluno />} />
      <Route path="/config-aluno" element={<ConfigAluno/>} />
      <Route path="/dados-aluno" element={<DadosAluno />} />
      <Route path="/email-senha-aluno" element={<EmailSenhaAluno />} />

      // Rotas do Dashboard do Professor
      <Route path="/home-prof" element={<HomeProf />} />
      <Route path="/eventos-prof" element={<EventosProf />} />
      <Route path="/config-prof" element={<ConfigProf />} />
      <Route path="/dados-prof" element={<DadosProf />} />
      <Route path="/email-senha-prof" element={<EmailSenhaProf />} />
    </Routes>
  );
}

export default AppRoutes;

