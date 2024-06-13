const express = require('express');
const router = express.Router();
const SaidaEventoController = require('../controllers/saidaEventoController');

const saidaEventoController = new SaidaEventoController();

router.get('/', saidaEventoController.listar);
router.get('/cadastrar', saidaEventoController.exibirFormularioCadastro);
router.post('/', saidaEventoController.cadastrar);
router.get('/:id/editar', saidaEventoController.editar);
router.post('/:id/atualizar', saidaEventoController.atualizar);
router.post('/:id/excluir', saidaEventoController.excluir);

module.exports = router;