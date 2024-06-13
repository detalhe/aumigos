const Database = require('../utils/database');
const ProdutoModel = require('../models/produtoModel');

class ProdutoController {
    async listar(req, res) {
        try {
            const db = new Database();
            const produtos = await db.ExecutaComando('SELECT * FROM produtos');
            res.render('produto/listar', { produtos });
        } catch (error) {
            res.status(500).send("Erro ao listar produtos: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('produto/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, categoria, quantidade, unidadeMedida, dataValidade } = req.body;
            const produto = new ProdutoModel(nome, categoria, quantidade, unidadeMedida, dataValidade);
            console.log('Produto cadastrado:', produto);
    
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO produtos (nome, categoria, quantidade, unidade_medida, data_validade) VALUES (?, ?, ?, ?, ?)', [produto.nome, produto.categoria, produto.quantidade, produto.unidadeMedida, produto.dataValidade]);
            res.redirect('/produtos');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar produto: " + error.message);
        }
    }
    

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const produto = await db.ExecutaComando('SELECT * FROM produtos WHERE id = ?', [id]);
            res.render('produto/editar', { produto: produto[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar produto para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const { nome, categoria, quantidade, unidadeMedida, dataValidade } = req.body;
            const produto = new ProdutoModel(nome, categoria, quantidade, unidadeMedida, dataValidade);
            console.log('Produto atualizado:', produto);
    
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE produtos SET nome = ?, categoria = ?, quantidade = ?, unidade_medida = ?, data_validade = ? WHERE id = ?', [produto.nome, produto.categoria, produto.quantidade, produto.unidadeMedida, produto.dataValidade, req.params.id]);
            res.redirect('/produtos');
        } catch (error) {
            res.status(500).send("Erro ao atualizar produto: " + error.message);
        }
    }
    
    
    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM produtos WHERE id = ?', [id]);
            res.redirect('/produtos');
        } catch (error) {
            res.status(500).send("Erro ao excluir produto: " + error.message);
        }
    }
}

module.exports = ProdutoController;