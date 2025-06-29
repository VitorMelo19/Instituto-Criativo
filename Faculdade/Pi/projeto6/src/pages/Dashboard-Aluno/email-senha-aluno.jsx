
import logo from "../../assets/imagens/logo3.svg";
import "../Dashboard-Admin/css/home.css";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function EmailSenhaAluno() {
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
    <div className="mainContentAdmin">
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'emailAtual', label: 'E-mail Atual', type: 'email', placeholder: 'exemplo@email.com' },
          { id: 'novoEmail', label: 'Novo E-mail', type: 'email', placeholder: 'Digite seu novo E-mail' },
          { id: 'senhaAtual', label: 'Senha Atual', type: 'password', placeholder: 'Digite sua senha atual' },
          { id: 'novaSenha', label: 'Nova Senha', type: 'password', placeholder: 'novaSenha' },
          { id: 'confirmarSenha', label: 'Confirmar Nova Senha', type: 'password', placeholder: 'Confirme a nova senha' },
        ].map(input => (
          <div className="form-group" key={input.id}>
            <label className="form-label" htmlFor={input.id}>{input.label}</label>
            <input type={input.type} id={input.id} className="form-control" placeholder={input.placeholder} />
          </div>
        ))}
      </div>
      <div className="botoes-email-senha">
        <button className="btn btn-primary" id="btnAlterarEmail">Salvar</button>
      </div>
    </div>
    </div>
  );
}
