
import logo from "../../assets/imagens/logo3.svg";
import "./css/home.css";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function Configuracoes() {
  return (
     <div className="adminDashboard">
                    <aside className="sidebarAdmin">
                    <div className="sidebarHeaderAdmin">
                        <img src={logo} alt="Logo" className="sidebarLogoAdmin" />
                    </div>
    
                    <nav className="adminDesktopNav">
                        <ul className="adminNavLinksVertical">
                        <li><a href="/home-admin"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/estatisticas"><img src={estatisticas} alt="Estatísticas" />Estatísticas</a></li>
                        <li><a href="/acesso"><img src={acesso} alt="Acesso" />Acesso</a></li>
                        <li><a href="/configuracoes"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
                        </ul>
                    </nav>
                    </aside>
    
                    <header className="adminHeaderMobile">
                    <div className="adminHeaderMobileContent">
                        <img src={logo} alt="Logo" className="adminLogoMobile" />
                        <button
                        className="adminMenuToggle"
                        onClick={() =>
                            document.querySelector(".adminMobileNav")?.classList.toggle("active")
                        }
                        >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        </button>
                    </div>
    
                    <nav className="adminMobileNav">
                        <ul className="adminMobileLinks">
                        <li><a href="/home-admin"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/estatisticas"><img src={estatisticas} alt="Estatísticas" />Estatísticas</a></li>
                        <li><a href="/acesso"><img src={acesso} alt="Acesso" />Acesso</a></li>
                        <li><a href="/configuracoes"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
                        </ul>
                    </nav>
                    </header>
        <div className="mainContentAdmin configPage">
      <section className="card mb-4 bloco-usuario">
        <div className="bloco-texto">
          <h1 className="titulo-ola">Olá,</h1>
          <h2 id="nomeUsuario" className="nome-usuario">Nome do Usuário</h2>
        </div>
        <div className="foto-cliente-config">
          <img id="fotoUsuario" src alt="Foto do usuário" />
        </div>
      </section>

      <section className="card bloco-conta">
        <h2 className="titulo-conta">Minha Conta</h2>
        <div className="botoes-conta">
            <a href="/dados" className="btn btn-outline">Alterar Dados Pessoais</a>
            <a href="/email-senha" className="btn btn-outline">Alterar E-mail/Senha</a>
        </div>

      </section>
      </div>
      </div>
  );
}