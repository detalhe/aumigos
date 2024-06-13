const Database = require('../utils/database');
const DoadorModel = require('../models/doadorModel');

class DoadorController {
    async listar(req, res) {
        try {
            const db = new Database();
            const doadores = await db.ExecutaComando('SELECT * FROM doadores');
            res.render('doador/listar', { doadores });
        } catch (error) {
            res.status(500).send("Erro ao listar doadores: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('doador/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, telefone, endereco } = req.body;
            const doador = new DoadorModel(nome, email, telefone, endereco);
            console.log('Doador cadastrado:', doador);
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO doadores (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)', [doador.nome, doador.email, doador.telefone, doador.endereco]);
            res.redirect('/doadores');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar doador: " + error.message);
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const doador = await db.ExecutaComando('SELECT * FROM doadores WHERE id = ?', [id]);
            res.render('doador/editar', { doador: doador[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar doador para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { nome, email, telefone, endereco } = req.body;
            const doador = new DoadorModel(nome, email, telefone, endereco);
            console.log('Doador atualizado:', doador);
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE doadores SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?', [doador.nome, doador.email, doador.telefone, doador.endereco, id]);
            res.redirect('/doadores');
        } catch (error) {
            res.status(500).send("Erro ao atualizar doador: " + error.message);
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM doadores WHERE id = ?', [id]);
            res.redirect('/doadores');
        } catch (error) {
            res.status(500).send("Erro ao excluir doador: " + error.message);
        }
    }
}

module.exports = DoadorController;
