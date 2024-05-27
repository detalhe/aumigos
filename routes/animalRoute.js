// routes/animalRoute.js

const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/animalController');

const animalController = new AnimalController();

router.get('/', animalController.listar);
router.get('/cadastrar', animalController.exibirFormularioCadastro);
router.post('/', animalController.cadastrar);
router.get('/:id/editar', animalController.editar);
router.post('/:id/atualizar', animalController.atualizar);
router.post('/:id/excluir', animalController.excluir);

module.exports = router;
