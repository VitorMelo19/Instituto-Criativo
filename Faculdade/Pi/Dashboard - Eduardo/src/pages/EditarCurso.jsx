import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarCurso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [curso, setCurso] = useState({
    titulo: '',
    descricao: '',
    cargaHoraria: '',
    nivel: '',
    link: '',
    imagem: null
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/cursos`)
      .then((res) => {
        const cursoEncontrado = res.data.find(c => c.id === parseInt(id));
        if (cursoEncontrado) {
          setCurso(cursoEncontrado);
          setPreview(`http://localhost:3000/uploads/${cursoEncontrado.imagem}`);
        }
      })
      .catch(err => {
        console.error("Erro ao carregar curso:", err);
        alert("Erro ao carregar curso.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurso(prev => ({ ...prev, imagem: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", curso.titulo);
    formData.append("descricao", curso.descricao);
    formData.append("cargaHoraria", curso.cargaHoraria);
    formData.append("nivel", curso.nivel);
    formData.append("link", curso.link);
    if (curso.imagem instanceof File) {
      formData.append("imagem", curso.imagem);
    }

    const token = localStorage.getItem("token");

    axios.put(`http://localhost:3000/cursos/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(() => {
        alert("Curso atualizado com sucesso!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Erro ao atualizar curso:", err);
        alert("Erro ao atualizar curso.");
      });
  };

  return (
    <div className="form-page">
      <h2>Editar Curso</h2>
      <form onSubmit={handleSubmit}>
        <input name="titulo" value={curso.titulo} onChange={handleChange} className="form-control" placeholder="Título" required />
        <textarea name="descricao" value={curso.descricao} onChange={handleChange} className="form-control" placeholder="Descrição" required />
        <input name="cargaHoraria" value={curso.cargaHoraria} onChange={handleChange} className="form-control" placeholder="Carga Horária" required />
        <select name="nivel" value={curso.nivel} onChange={handleChange} className="form-control">
          <option>Iniciante</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <input name="link" type="url" value={curso.link} onChange={handleChange} className="form-control" placeholder="Link do curso" />
        <input name="imagem" type="file" onChange={handleImageChange} className="form-control" accept="image/*" />
        {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarCurso;
