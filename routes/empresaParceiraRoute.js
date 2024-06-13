const express = require('express');
const router = express.Router();
const EmpresaParceiraController = require('../controllers/empresaParceiraController');

const empresaParceiraController = new EmpresaParceiraController();

router.get('/', empresaParceiraController.listar);
router.post('/', empresaParceiraController.cadastrar);
router.get('/cadastrar', empresaParceiraController.exibirFormularioCadastro);
router.get('/:id/editar', empresaParceiraController.editar);
router.post('/:id/atualizar', empresaParceiraController.atualizar);
router.post('/:id/excluir', empresaParceiraController.excluir);


module.exports = router;
