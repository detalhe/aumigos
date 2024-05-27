const express = require('express');
const router = express.Router();
const RelatorioController = require('../controllers/relatorioController');

const relatorioController = new RelatorioController();

router.get('/', (req, res) => relatorioController.exibirFormularioRelatorio(req, res));
router.post('/', (req, res) => relatorioController.gerarRelatorio(req, res));

module.exports = router;
