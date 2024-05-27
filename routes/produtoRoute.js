// routes/produtoRoute.js

const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

const produtoController = new ProdutoController();

router.get('/', produtoController.listar);
router.get('/cadastrar', produtoController.exibirFormularioCadastro);
router.post('/', produtoController.cadastrar);
router.get('/:id/editar', produtoController.editar);
router.post('/:id/atualizar', produtoController.atualizar);
router.post('/:id/excluir', produtoController.excluir);

module.exports = router;