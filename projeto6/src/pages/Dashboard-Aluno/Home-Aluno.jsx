import React, { useEffect, useRef } from "react";
import "../Dashboard-Admin/css/home.css";
import { carregarGraficos } from "../Dashboard-Admin/utils/graficos";
import logo from "../../assets/imagens/logo3.svg";
// import user from "../../assets/imagens/User.jpg";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function HomeAluno() {
  const eventosContainerRef = useRef(null);


  useEffect(() => {
     carregarGraficos(null, null, null, eventosContainerRef);
  }, []);

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


      <main className="mainContentAdmin">
        <header className="headerAdmin">
          <h2>Painel Inicial</h2>
          <div className="userMenuAdmin">
            <span className="nomeUsuario">Nome do Aluno</span>
            <div className="userImageAdmin">
              <img src="CAMINHO_DA_IMAGEM" alt="Usuário" />
            </div>
          </div>
        </header>

        <div className="containerEventosAdmin">
        <div className="card mt-4">
            <div className="card-header">
            <h3>Próximos Eventos</h3>
            </div>
            <div className="card-body">
            <div className="eventosCarrosselContainer">
                <div className="event-card">
                    <div className="event-image">
                    <img src="https://tse4.mm.bing.net/th/id/OIP.uPorqYq6ft-IhMe6SFdnvwHaE8?cb=iwp2&rs=1&pid=ImgDetMain" alt="Imagem do Evento" />
                    </div>
                    <div className="event-content">
                    <h4 className="event-title">Curso de Banco de Dados</h4>
                    <p className="event-date">Data: 12/06/2025</p>
                    <p className="event-description">Descrição de teste sem API</p>
                    </div>
                </div>

                <div className="event-card">
                    <div className="event-image">
                    <img src="https://ichi.pro/assets/images/max/724/1*RJMxLdTHqVBSijKmOO5MAg.jpeg" alt="Imagem do Evento" />
                    </div>
                    <div className="event-content">
                    <h4 className="event-title">Curso de Python</h4>
                    <p className="event-date">Data: 22/07/2025</p>
                    <p className="event-description">Descrição de teste sem API</p>
                    </div>
                </div>

                <div className="event-card">
                    <div className="event-image">
                    <img src="https://th.bing.com/th/id/OIP.ouIzwLtycFBEftuJEw4J5gHaE8?o=7&cb=iwp2rm=3&rs=1&pid=ImgDetMain" alt="Imagem do Evento" />
                    </div>
                    <div className="event-content">
                    <h4 className="event-title">Palestra - Entendendo o Mercado de Trabalho</h4>
                    <p className="event-date">Data: 25/07/2025</p>
                    <p className="event-description">Descrição de teste sem API</p>
                    </div>
                </div>
                </div>


            <div className="card-footer text-center">
                <a href="/eventos-aluno" className="botaoVerTodos">Ver todos os eventos</a>
            </div>
            </div>
        </div>
        </div>
        </main>
        </div>
  );
}