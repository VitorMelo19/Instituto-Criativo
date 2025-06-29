import { useState, useEffect } from 'react';
import '../css/dashboard.css';
import '../css/main.css';
import axios from 'axios';
import { getToken, isAdmin, isProfessor, getPerfil } from '../utils/auth';
import Header from '../components/Header';

const Eventos = () => {
  const [tipoCadastro, setTipoCadastro] = useState('evento');
  const [eventos, setEventos] = useState([]);
  const [preview, setPreview] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const token = getToken();

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await axios.get("/api/eventos");
        setEventos(Array.isArray(resposta.data) ? resposta.data : []);
      } catch (erro) {
        console.error("Erro ao buscar eventos:", erro);
      }
    };
    buscarEventos();
  }, []);

  const handleDeleteEvento = async (id) => {
    if (!window.confirm("Deseja realmente excluir este evento?")) return;

    try {
      await axios.delete(`/api/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEventos((prev) => prev.filter((ev) => ev.id !== id));
      alert("Evento excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir evento:", erro);
      alert("Erro ao excluir evento. Verifique o console.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const perfil = getPerfil();
    const formData = new FormData();

    if (tipoCadastro === "evento" && perfil !== "admin") {
      alert("Apenas administradores podem cadastrar eventos.");
      return;
    }
    if (tipoCadastro === "curso" && !(perfil === "admin" || perfil === "professor")) {
      alert("Apenas administradores ou professores podem cadastrar cursos.");
      return;
    }

    if (tipoCadastro === "evento") {
      formData.append("titulo", e.target.titulo.value);
      formData.append("descricao", e.target.descricao.value);
      formData.append("data", e.target.data.value);
      formData.append("local", e.target.local.value);
      formData.append("imagem", e.target.imagem.value);
    } else {
      formData.append("titulo", e.target.titulo.value);
      formData.append("descricao", e.target.descricao.value);
      formData.append("cargaHoraria", e.target.cargaHoraria.value);
      formData.append("nivel", e.target.nivel.value);
      formData.append("link", e.target.link.value);
      formData.append("imagem", e.target.imagem.value);
    }

    try {
      const url = tipoCadastro === "evento" ? "/api/eventos" : "/api/cursos";
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Cadastro realizado com sucesso!");
      setPreview(null);
      setModalAberto(false);
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar. Verifique o console.");
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link active">Eventos</a></li>
              <li className="nav-item"><a href="/meus-eventos" className="nav-link">Meus Eventos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          {(isAdmin() || isProfessor()) && (
            <div className="filter-position">
              <button className="btn btn-primary" onClick={() => setModalAberto(true)}>
                + Adicionar Evento ou Curso
              </button>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: eventos.length === 0 ? 'center' : 'flex-start',
              height: eventos.length === 0 ? '70vh' : 'auto'
            }}
          >
            <div className="card" style={{ width: '100%', maxWidth: '900px' }}>
              <div className="card-body">
                {eventos.length === 0 ? (
                  <p>Sem eventos cadastrados.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {eventos.map((ev) => (
                      <div key={ev.id} className="event-card">
                        <h4>{ev.titulo}</h4>
                        <p>{ev.descricao}</p>
                        <p><strong>Data:</strong> {new Date(ev.data).toLocaleDateString()}</p>
                        <p><strong>Local:</strong> {ev.local}</p>
                        {isAdmin() && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteEvento(ev.id)}
                            style={{ marginTop: '0.5rem' }}
                          >
                            🗑 Excluir
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {modalAberto && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={() => setModalAberto(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '500px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>
                Adicionar Novo {tipoCadastro === 'evento' ? 'Evento' : 'Curso'}
              </h3>

              <select className="form-control" value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value)}>
                <option value="evento">Evento</option>
                <option value="curso">Curso</option>
              </select>

              {tipoCadastro === 'evento' ? (
                <>
                  <input type="text" name="titulo" placeholder="Título" className="form-control" required />
                  <textarea name="descricao" rows="4" placeholder="Descrição" className="form-control" required></textarea>
                  <input type="date" name="data" className="form-control" required />
                  <input type="text" name="local" placeholder="Local" className="form-control" required />
                  <input
                    type="url"
                    name="imagem"
                    placeholder="URL da imagem do evento"
                    className="form-control"
                    onChange={(e) => setPreview(e.target.value)}
                    required
                  />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              ) : (
                <>
                  <input type="text" name="titulo" placeholder="Título do curso" className="form-control" required />
                  <textarea name="descricao" rows="4" placeholder="Descrição" className="form-control" required></textarea>
                  <input type="text" name="cargaHoraria" placeholder="Carga horária" className="form-control" required />
                  <select name="nivel" className="form-control" required>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                  <input type="url" name="link" placeholder="Link do curso" className="form-control" required />
                  <input
                    type="url"
                    name="imagem"
                    placeholder="URL da imagem do curso"
                    className="form-control"
                    onChange={(e) => setPreview(e.target.value)}
                    required
                  />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Eventos;
