// routes/usuarioRoute.js

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

const usuarioController = new UsuarioController();

router.get('/', usuarioController.listar);
router.get('/cadastrar', usuarioController.exibirFormularioCadastro);
router.post('/', usuarioController.cadastrar);
router.get('/:id/editar', usuarioController.editar);
router.post('/:id/atualizar', usuarioController.atualizar);
router.post('/:id/excluir', usuarioController.excluir);

module.exports = router;
