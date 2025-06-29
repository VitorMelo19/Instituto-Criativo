import React, { useState, useEffect} from "react";
import "./css/home.css";
import logo from "../../assets/imagens/logo3.svg";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";



const usuarios = [
  { id: 1, nome: "João Silva", email: "joao@email.com" },
  { id: 2, nome: "Maria Souza", email: "maria@email.com" },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@email.com" }
];

export default function AccessTable() {
  const [activeUser, setActiveUser] = useState(null);
  const [modalData, setModalData] = useState({ id: null, tipo: "", nome: "" });
  const [permissoes, setPermissoes] = useState({});

  const abrirModal = (id, nome, tipo) => {
    setModalData({ id, tipo, nome });
    setActiveUser(id);
  };

  const confirmarPermissao = () => {
  const novasPermissoes = {
    ...permissoes,
    [modalData.id]: modalData.tipo
  };
  setPermissoes(novasPermissoes);
  localStorage.setItem("permissoes", JSON.stringify(novasPermissoes));
  setModalData({ id: null, tipo: "", nome: "" });
  setActiveUser(null);
};

  const cancelar = () => {
    setModalData({ id: null, tipo: "", nome: "" });
    setActiveUser(null);
  };

  useEffect(() => {
  const permissoesSalvas = localStorage.getItem("permissoes");
  if (permissoesSalvas) {
    setPermissoes(JSON.parse(permissoesSalvas));
  }
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
              <h2>Controle de Acesso</h2>
              <div className="userMenuAdmin">
                <span className="nomeUsuario">Nome do Admin</span>
                <div className="userImageAdmin">
                  <img src="CAMINHO_DA_IMAGEM" alt="Usuário" />
                </div>
              </div>
            </header>
            
    <div className="card" style={{ borderRadius: "20px", overflowX: "auto" }}>
      <div className="card-body">
        <table className="acesso-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Permitir Acesso para Aluno</th>
              <th>Permitir Acesso para Prof</th>
              <th>Permitir Acesso para Admin</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                {["aluno", "prof", "admin"].map((tipo) => (
                  <td key={tipo}>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={permissoes[user.id] === tipo}
                        onChange={() => abrirModal(user.id, user.nome, tipo)}
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {activeUser !== null && (
        <div className="modal active">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmar alteração</h3>
              <button className="modal-close" onClick={cancelar}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Você confirma a alteração de acesso do usuário <strong>{modalData.nome}</strong> para{" "}
                <strong>{modalData.tipo}</strong>?
              </p>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={confirmarPermissao}>
                  Confirmar
                </button>
                <button className="btn btn-outline" onClick={cancelar}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
    </div>
  );
}
