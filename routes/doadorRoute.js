// routes/doadorRoute.js

const express = require('express');
const router = express.Router();
const DoadorController = require('../controllers/doadorController');

const doadorController = new DoadorController();

router.get('/', doadorController.listar);
router.get('/cadastrar', doadorController.exibirFormularioCadastro);
router.post('/', doadorController.cadastrar);
router.get('/:id/editar', doadorController.editar);
router.post('/:id/atualizar', doadorController.atualizar);
router.post('/:id/excluir', doadorController.excluir);

module.exports = router;
