const Database = require('../utils/database');
const UsuarioModel = require('../models/usuarioModel');

class UsuarioController {
    async listar(req, res) {
        try {
            const db = new Database();
            const usuarios = await db.ExecutaComando('SELECT * FROM usuarios');
            res.render('usuario/listar', { usuarios });
        } catch (error) {
            res.status(500).send("Erro ao listar usuários: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('usuario/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, senha, tipo, cargo, status } = req.body;
            const usuario = new UsuarioModel(nome, email, senha, tipo, cargo, status);
            console.log('Usuario cadastrado:', usuario);
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO usuarios (nome, email, senha, tipo, cargo, status) VALUES (?, ?, ?, ?, ?, ?)', [usuario.nome, usuario.email, usuario.senha, usuario.tipo, usuario.cargo, usuario.status]);
            res.redirect('/usuarios');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar usuário: " + error.message);
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const usuario = await db.ExecutaComando('SELECT * FROM usuarios WHERE id = ?', [id]);
            res.render('usuario/editar', { usuario: usuario[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar usuário para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { nome, email, senha, tipo, cargo, status } = req.body;
            const usuario = new UsuarioModel(nome, email, senha, tipo, cargo, status);
            console.log('Usuario atualizado:', usuario);
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ?, cargo = ?, status = ? WHERE id = ?', [usuario.nome, usuario.email, usuario.senha, usuario.tipo, usuario.cargo, usuario.status, id]);
            res.redirect('/usuarios');
        } catch (error) {
            res.status(500).send("Erro ao atualizar usuário: " + error.message);
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM usuarios WHERE id = ?', [id]);
            res.redirect('/usuarios');
        } catch (error) {
            res.status(500).send("Erro ao excluir usuário: " + error.message);
        }
    }
}

module.exports = UsuarioController;
