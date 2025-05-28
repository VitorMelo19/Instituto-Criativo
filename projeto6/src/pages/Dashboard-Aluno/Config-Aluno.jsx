
import logo from "../../assets/imagens/logo3.svg";
import "../Dashboard-Admin/css/home.css";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function ConfigAluno() {
  return (
     <div className="adminDashboard">
                    <aside className="sidebarAdmin">
                    <div className="sidebarHeaderAdmin">
                        <img src={logo} alt="Logo" className="sidebarLogoAdmin" />
                    </div>
    
                    <nav className="adminDesktopNav">
                        <ul className="adminNavLinksVertical">
                        <li><a href="/home-aluno"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos-aluno"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/config-aluno"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
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
                        <li><a href="/home-aluno"><img src={home} alt="Home" />Home</a></li>
                        <li><a href="/eventos-aluno"><img src={eventos} alt="Eventos" />Eventos</a></li>
                        <li><a href="/config-aluno"><img src={configuracoes} alt="Configurações" />Configurações</a></li>
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
            <a href="/dados-aluno" className="btn btn-outline">Alterar Dados Pessoais</a>
            <a href="/email-senha-aluno" className="btn btn-outline">Alterar E-mail/Senha</a>
        </div>

      </section>
      </div>
      </div>
  );
}