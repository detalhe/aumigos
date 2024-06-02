const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

const usuarioController = new UsuarioController();

router.get('/', (req, res) => {
    res.render('login/login', { layout: false });
});

router.post('/', usuarioController.login);

module.exports = router;