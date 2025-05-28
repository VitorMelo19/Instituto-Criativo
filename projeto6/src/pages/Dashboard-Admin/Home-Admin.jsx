import React, { useEffect, useRef } from "react";
import "./css/home.css";
import { carregarGraficos } from "./utils/graficos";
import logo from "../../assets/imagens/logo3.svg";
// import user from "../../assets/imagens/User.jpg";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function HomeAdmin() {
  const eventosRef = useRef(null);
  const arrecadacaoRef = useRef(null);
  const destaqueLucroRef = useRef(null);
  const eventosContainerRef = useRef(null);

  useEffect(() => {
    carregarGraficos(eventosRef, arrecadacaoRef, destaqueLucroRef, eventosContainerRef);
  }, []);

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


      <main className="mainContentAdmin">
        <header className="headerAdmin">
          <h2>Painel Inicial</h2>
          <div className="userMenuAdmin">
            <span className="nomeUsuario">Nome do Admin</span>
            <div className="userImageAdmin">
              <img src="CAMINHO_DA_IMAGEM" alt="Usuário" />
            </div>
          </div>
        </header>

        <div className="graficosWrapperAdmin">
          <section className="graficoAdmin">
            <h3>Eventos/Projetos</h3>
            <canvas ref={eventosRef}></canvas>
          </section>

          <section className="graficoAdmin">
            <h3>Arrecadações/Doações</h3>
            <canvas ref={arrecadacaoRef}></canvas>
            <div>
              <strong>Maior Lucro mensal de Doações</strong>
              <div ref={destaqueLucroRef}></div>
            </div>
          </section>
        </div>

        <div className="containerEventosAdmin">
        <div className="card mt-4">
            <div className="card-header">
            <h3>Próximos Eventos</h3>
            </div>
            <div className="card-body">
            <div className="eventosCarrosselContainer" ref={eventosContainerRef}></div>

            <div className="card-footer text-center">
                <a href="/eventos" className="botaoVerTodos">Ver todos os eventos</a>
            </div>
            </div>
        </div>
        </div>

      </main>
    </div>
  );
}
