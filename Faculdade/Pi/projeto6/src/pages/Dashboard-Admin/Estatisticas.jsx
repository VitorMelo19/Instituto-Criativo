import React, { useEffect, useRef} from "react";
import "./css/home.css";
import { carregarGraficos } from "./utils/graficos";
import "chart.js/auto";

import logo from "../../assets/imagens/logo3.svg";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

function EstatisticasContent() {
  const eventosRef = useRef(null);
  const arrecadacaoRef = useRef(null);

  useEffect(() => {
    carregarGraficos(eventosRef, arrecadacaoRef);
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
          <h2>Estatísticas</h2>
          <div className="userMenuAdmin">
            <span className="nomeUsuario">Nome do Admin</span>
            <div className="userImageAdmin">
              <img src="CAMINHO_DA_IMAGEM" alt="Usuário" />
            </div>
          </div>
        </header>
        <div className="header-actions">
          <div className="date-filter">
            <select id="statsPeriod" className="form-control">
              <option value="7">Últimos 7 dias</option>
              <option value="30" selected>
                Últimos 30 dias
              </option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último ano</option>
            </select>
          </div>
        </div>

      {/* Resumo Estatístico */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-value">1.248</div>
          <div className="stat-label">Total de Inscrições</div>
          <div className="stat-change up">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>12% em relação ao período anterior</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">R$ 24.560</div>
          <div className="stat-label">Arrecadação Total</div>
          <div className="stat-change down">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 5V19M19 12L12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>8% em relação ao período anterior</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">48</div>
          <div className="stat-label">Eventos Realizados</div>
          <div className="stat-change up">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>5 novos eventos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">Taxa de Satisfação</div>
          <div className="stat-change up">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>3% em relação ao período anterior</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="card">
          <div className="card-header">
            <h3>Tipos de Eventos</h3>
          </div>
          <div className="card-body">
            <canvas ref={eventosRef}></canvas>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Arrecadação Mensal</h3>
          </div>
          <div className="card-body">
            <canvas ref={arrecadacaoRef}></canvas>
          </div>
        </div>
      </div>
      </main>
      </div>
  );
}

export default EstatisticasContent;
