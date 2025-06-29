import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/imagens/logo3.svg";
import "./css/home.css";
import home from "../../assets/imagens/icons/home.svg";
import eventos from "../../assets/imagens/icons/calendar.svg";
import estatisticas from "../../assets/imagens/icons/estatisticas.svg";
import acesso from "../../assets/imagens/icons/user-check.svg";
import configuracoes from "../../assets/imagens/icons/Configurações.svg";

export default function Dados() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [imagemOriginal, setImagemOriginal] = useState(null);
  const imagemRef = useRef(null);
  const canvasRef = useRef(null);
  const [posicao, setPosicao] = useState({ x: 50, y: 50 });
  const [arrastando, setArrastando] = useState(false);

  useEffect(() => {
    const imagemSalva = localStorage.getItem("imagemPerfil");
    if (imagemSalva) {
      document.getElementById("fotoUsuario").src = imagemSalva;
    }
  }, []);

  const abrirSeletorArquivo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagemOriginal(reader.result);
          setMostrarModal(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const cancelar = () => {
    setMostrarModal(false);
    setImagemOriginal(null);
  };

  const excluirFoto = () => {
    document.getElementById("fotoUsuario").src = "/Front-End/imagens/user.svg";
    localStorage.removeItem("imagemPerfil");
  };

  const iniciarArrasto = (e) => {
    e.preventDefault();
    setArrastando(true);
  };

  const moverArrasto = (e) => {
    if (!arrastando) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);

    if (x && y) {
      const novoX = ((x - bounds.left) / bounds.width) * 100;
      const novoY = ((y - bounds.top) / bounds.height) * 100;
      setPosicao({ x: Math.min(100, Math.max(0, novoX)), y: Math.min(100, Math.max(0, novoY)) });
    }
  };

  const pararArrasto = () => {
    setArrastando(false);
  };

  const salvarCorte = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const imagem = imagemRef.current;

  const tamanhoFinal = 200; // Tamanho do resultado (círculo visível)
  const raio = tamanhoFinal / 2;

  canvas.width = tamanhoFinal;
  canvas.height = tamanhoFinal;

  const canvasTemp = document.createElement("canvas");
  canvasTemp.width = 300;
  canvasTemp.height = 300;
  const ctxTemp = canvasTemp.getContext("2d");

  ctxTemp.drawImage(imagem, 0, 0, 300, 300);

  const cx = (posicao.x / 100) * 300;
  const cy = (posicao.y / 100) * 300;

  // Recortar apenas a área do círculo (nítida, sem borrado)
  const imageData = ctxTemp.getImageData(cx - raio, cy - raio, tamanhoFinal, tamanhoFinal);

  ctx.clearRect(0, 0, tamanhoFinal, tamanhoFinal);
  ctx.save();
  ctx.beginPath();
  ctx.arc(raio, raio, raio, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.putImageData(imageData, 0, 0);
  ctx.restore();

  const novaFoto = canvas.toDataURL("image/png");
  document.getElementById("fotoUsuario").src = novaFoto;
  localStorage.setItem("imagemPerfil", novaFoto);
  cancelar();
};

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

      <div className="mainContentAdmin">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {['nome', 'email', 'celular', 'documento', 'endereco', 'cep'].map((id, idx) => (
            <div className="form-group" key={id}>
              <label className="form-label" htmlFor={id}>
                {['Nome', 'Sobrenome', 'Telefone', 'CPF/CNPJ', 'Endereço,Nº', 'CEP'][idx]}
              </label>
              <input type="text" id={id} name={id} className="form-control" />
            </div>
          ))}
        </div>

        <div className="card bloco-foto">
          <div className="bloco-botoes">
            <button onClick={abrirSeletorArquivo} className="btn btn-outline">Editar Foto</button>
            <button onClick={excluirFoto} className="btn btn-outline">Excluir Foto</button>
          </div>
          <div className="foto-user">
            <img id="fotoUsuario" src="/Front-End/imagens/user.svg" alt="Foto do usuário" />
          </div>
        </div>

        {mostrarModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Editar Foto</h3>
                <button className="modal-close" onClick={cancelar}>&times;</button>
              </div>
              <div className="modal-body">
                <div
                  className="crop-preview"
                  onMouseMove={moverArrasto}
                  onTouchMove={moverArrasto}
                  onMouseUp={pararArrasto}
                  onTouchEnd={pararArrasto}
                >
                  <img
                    ref={imagemRef}
                    src={imagemOriginal}
                    alt="Prévia"
                    className="imagem-recorte"
                  />
                  <div
                    onMouseDown={iniciarArrasto}
                    onTouchStart={iniciarArrasto}
                    style={{
                      position: "absolute",
                      top: `${posicao.y}%`,
                      left: `${posicao.x}%`,
                      width: "200px",
                      height: "200px",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%",
                      border: "2px dashed #fff",
                      pointerEvents: "auto",
                      cursor: "move",
                    }}
                  />
                </div>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
              <div className="modal-actions">
                <button className="btn btnCancel" onClick={cancelar}>Cancelar</button>
                <button className="btn btnSave" onClick={salvarCorte}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
