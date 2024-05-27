// controllers/animalController.js

const Database = require('../utils/database');
const AnimalModel = require('../models/animalModel');

class AnimalController {
    async listar(req, res) {
        try {
            const db = new Database();
            const animais = await db.ExecutaComando('SELECT * FROM animais');
            res.render('animal/listar', { animais });
        } catch (error) {
            res.status(500).send("Erro ao listar animais: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('animal/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, tipo, sexo, porte, temperamento, status, descricao } = req.body;
            const animal = new AnimalModel(nome, tipo, sexo, porte, temperamento, status, descricao);
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO animais (nome, tipo, sexo, porte, temperamento, status, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)', [animal.nome, animal.tipo, animal.sexo, animal.porte, animal.temperamento, animal.status, animal.descricao]);
            res.redirect('/animais');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar animal: " + error.message);
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const animal = await db.ExecutaComando('SELECT * FROM animais WHERE id = ?', [id]);
            res.render('animal/editar', { animal: animal[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar animal para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { nome, tipo, sexo, porte, temperamento, status, descricao } = req.body;
            const animal = new AnimalModel(nome, tipo, sexo, porte, temperamento, status, descricao);
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE animais SET nome = ?, tipo = ?, sexo = ?, porte = ?, temperamento = ?, status = ?, descricao = ? WHERE id = ?', [animal.nome, animal.tipo, animal.sexo, animal.porte, animal.temperamento, animal.status, animal.descricao, id]);
            res.redirect('/animais');
        } catch (error) {
            res.status(500).send("Erro ao atualizar animal: " + error.message);
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM animais WHERE id = ?', [id]);
            res.redirect('/animais');
        } catch (error) {
            res.status(500).send("Erro ao excluir animal: " + error.message);
        }
    }
}

module.exports = AnimalController;
