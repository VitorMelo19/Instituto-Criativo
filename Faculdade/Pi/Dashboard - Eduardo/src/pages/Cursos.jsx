import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../css/dashboard.css';
import '../css/main.css';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const resposta = await axios.get('/api/cursos');
        setCursos(Array.isArray(resposta.data) ? resposta.data : []);
      } catch (erro) {
        console.error('Erro ao buscar cursos:', erro);
      }
    };

    buscarCursos();
  }, []);

  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link">Eventos</a></li>
              <li className="nav-item"><a href="/cursos" className="nav-link active">Cursos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="card" style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
            <div className="card-body">
              {cursos.length === 0 ? (
                <p>Sem cursos cadastrados.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {cursos.map((curso) => (
                    <div key={curso.id} className="event-card">
                      <h4>{curso.titulo}</h4>
                      <p>{curso.descricao}</p>
                      <p><strong>Carga horária:</strong> {curso.cargaHoraria}</p>
                      <p><strong>Nível:</strong> {curso.nivel}</p>
                      <a href={curso.link} target="_blank" rel="noreferrer">Acessar curso</a>
                      {curso.imagem && (
                        <img
                          src={`/uploads/${curso.imagem}`}
                          alt="imagem do curso"
                          style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cursos;
