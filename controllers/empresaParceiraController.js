// controllers/empresaParceiraController.js

const Database = require('../utils/database');
const EmpresaParceiraModel = require('../models/empresaParceiraModel');

class EmpresaParceiraController {
    async listar(req, res) {
        try {
            const db = new Database();
            const empresas = await db.ExecutaComando('SELECT * FROM empresas_parceiras');
            res.render('empresaParceira/listar', { empresas });
        } catch (error) {
            res.status(500).send("Erro ao listar empresas parceiras: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, telefone, website, tipoParceria } = req.body;
            const empresa = new EmpresaParceiraModel(nome, email, telefone, website, tipoParceria);
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO empresas_parceiras (nome, email, telefone, website, tipo_parceria) VALUES (?, ?, ?, ?, ?)', [empresa.nome, empresa.email, empresa.telefone, empresa.website, empresa.tipoParceria]);
            res.redirect('/empresas-parceiras');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar empresa parceira: " + error.message);
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const empresa = await db.ExecutaComando('SELECT * FROM empresas_parceiras WHERE id = ?', [id]);
            res.render('empresaParceira/editar', { empresa: empresa[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar empresa parceira para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { nome, email, telefone, website, tipoParceria } = req.body;
            const empresa = new EmpresaParceiraModel(nome, email, telefone, website, tipoParceria);
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE empresas_parceiras SET nome = ?, email = ?, telefone = ?, website = ?, tipo_parceria = ? WHERE id = ?', [empresa.nome, empresa.email, empresa.telefone, empresa.website, empresa.tipoParceria, id]);
            res.redirect('/empresas-parceiras');
        } catch (error) {
            res.status(500).send("Erro ao atualizar empresa parceira: " + error.message);
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM empresas_parceiras WHERE id = ?', [id]);
            res.redirect('/empresas-parceiras');
        } catch (error) {
            res.status(500).send("Erro ao excluir empresa parceira: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('empresaParceira/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }
}

module.exports = EmpresaParceiraController;
