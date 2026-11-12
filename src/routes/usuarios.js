const express = require('express');
const pool = require('../db');

const router = express.Router();

// POST /usuarios - insere um novo registro
router.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );

    return res.status(201).json({ id: resultado.insertId, nome, email });
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Já existe um usuário com este email.' });
    }
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao inserir usuário.' });
  }
});

// GET /usuarios - lista todos os registros
router.get('/', async (req, res) => {
  try {
    const [linhas] = await pool.query('SELECT * FROM usuarios');
    return res.status(200).json(linhas);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao listar usuários.' });
  }
});

// PUT /usuarios/:id - atualiza um registro
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }

    const [resultado] = await pool.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ id: Number(id), nome, email });
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Já existe um usuário com este email.' });
    }
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
  }
});

// DELETE /usuarios/:id - remove um registro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao remover usuário.' });
  }
});

module.exports = router;
