import Curso from '../models/Curso.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Suporte para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cursoController = {
  criarCurso: async (req, res) => {
    try {
      const { titulo, descricao, cargaHoraria, nivel, link, imagem: imagemURL } = req.body;
      const imagem = req.file ? req.file.filename : imagemURL;

    if (!imagem) {
    return res.status(400).json({ message: 'Imagem obrigatória' });
    }


      const novoCurso = await Curso.create({
        titulo,
        descricao,
        cargaHoraria,
        nivel,
        link,
        imagem
      });

      res.status(201).json(novoCurso);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  },

  listarCursos: async (req, res) => {
    try {
      const cursos = await Curso.findAll();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
  },

  atualizarCurso: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, cargaHoraria, nivel, link } = req.body;
      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }

      if (req.file) {
        const caminhoAntigo = path.resolve(__dirname, '../../uploads', curso.imagem);
        if (fs.existsSync(caminhoAntigo)) {
          fs.unlinkSync(caminhoAntigo);
        }
        curso.imagem = req.file.filename;
      }

      curso.titulo = titulo;
      curso.descricao = descricao;
      curso.cargaHoraria = cargaHoraria;
      curso.nivel = nivel;
      curso.link = link;

      await curso.save();
      res.status(200).json(curso);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      res.status(500).json({ message: 'Erro ao atualizar curso' });
    }
  },

  deletarCurso: async (req, res) => {
    try {
      const { id } = req.params;
      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }

      const caminhoImagem = path.resolve(__dirname, '../../uploads', curso.imagem);
      if (fs.existsSync(caminhoImagem)) {
        fs.unlinkSync(caminhoImagem);
      }

      await curso.destroy();
      res.status(200).json({ message: 'Curso deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      res.status(500).json({ message: 'Erro ao deletar curso' });
    }
  }
};

export default cursoController;
