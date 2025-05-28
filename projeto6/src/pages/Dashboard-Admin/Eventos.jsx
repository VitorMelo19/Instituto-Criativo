import React, { useState, useRef } from "react";
import "./css/home.css";

import logo from "../../assets/imagens/logo3.svg";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function Eventos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setCropOpen(true);
    }
  };

  return (
    <div className="eventosDashboard">
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
          <button className="adminMenuToggle" onClick={() => {
            document.querySelector(".adminMobileNav")?.classList.toggle("active")
          }}>
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

      <main className="eventosMainContent">
        <header className="eventosHeader">
          <h2>Eventos</h2>
          <div className="userMenuAdmin">
            <span className="nomeUsuario">Nome do Admin</span>
            <div className="userImageAdmin">
              <img src="CAMINHO_DA_IMAGEM" alt="Usuário" />
            </div>
          </div>
        </header>

        <div className="eventosFiltros">
          <div className="filtro">
            <label>Tipo de Evento</label>
            <select>
              <option value="all">Todos</option>
              <option value="palestra">Palestra</option>
              <option value="workshop">Workshop</option>
              <option value="curso">Curso</option>
            </select>
          </div>
          <div className="filtro">
            <label>Data</label>
            <select>
              <option value="all">Todas</option>
              <option value="today">Hoje</option>
              <option value="week">Semana</option>
              <option value="month">Mês</option>
            </select>
          </div>
          <div className="filtro search">
            <label>Buscar</label>
            <div className="inputIcon">
              <input type="text" placeholder="Buscar..." />
              <button className="btnSearch"><i className="fas fa-search"></i></button>
            </div>
          </div>
          <div className="addEvent">
            <button onClick={() => setModalOpen(true)} className="btnAdd">+ Adicionar Evento</button>
          </div>
        </div>

        {modalOpen && (
          <div className="modal active">
            <div className="modalContent">
              <div className="modalHeader">
                <h3>Adicionar Novo Evento</h3>
                <button className="modalClose" onClick={() => setModalOpen(false)}>&times;</button>
              </div>
              <div className="modalBody">
                <form>
                  <label>Título do Evento</label>
                  <input type="text" required />

                  <label>Descrição</label>
                  <textarea rows="4" required></textarea>

                  <label>Data</label>
                  <input type="date" required />

                  <label>Local</label>
                  <input type="text" required />

                  <label>Imagem</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />

                  <div className="formActions">
                    <button type="button" onClick={() => setModalOpen(false)} className="btnCancel">Cancelar</button>
                    <button type="submit" className="btnSave">Salvar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {cropOpen && (
          <div className="modal active">
            <div className="modalContent">
              <div className="modalHeader">
                <h3>Pré-visualização da Imagem</h3>
                <button className="modalClose" onClick={() => setCropOpen(false)}>&times;</button>
              </div>
              <div className="modalBody">
                <img src={imagePreview} alt="Prévia" className="previewImage" />
                <div className="formActions">
                  <button className="btnCancel" onClick={() => setCropOpen(false)}>Cancelar</button>
                  <button className="btnSave">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
