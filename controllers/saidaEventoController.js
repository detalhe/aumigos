// controllers/saidaEventoController.js

const Database = require('../utils/database');
const SaidaEventoModel = require('../models/saidaEventoModel');

class SaidaEventoController {
    async listar(req, res) {
        try {
            const db = new Database();
            const saidasEventos = await db.ExecutaComando('SELECT * FROM saidas_eventos');
            res.render('saidaEvento/listar', { saidasEventos });
        } catch (error) {
            res.status(500).send("Erro ao listar saídas de eventos: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            res.render('saidaEvento/cadastrar');
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { evento, dataSaida, horaSaida, responsavel, item, quantidade } = req.body;
            const saidaEvento = new SaidaEventoModel(evento, dataSaida, horaSaida, responsavel, item, quantidade);
            const db = new Database();
            await db.ExecutaComandoNonQuery('INSERT INTO saidas_eventos (evento, data_saida, hora_saida, responsavel, item, quantidade) VALUES (?, ?, ?, ?, ?, ?)', [saidaEvento.evento, saidaEvento.dataSaida, saidaEvento.horaSaida, saidaEvento.responsavel, saidaEvento.item, saidaEvento.quantidade]);
            res.redirect('/saidas-eventos');
        } catch (error) {
            res.status(500).send("Erro ao cadastrar saída de evento: " + error.message);
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            const saidaEvento = await db.ExecutaComando('SELECT * FROM saidas_eventos WHERE id = ?', [id]);
            res.render('saidaEvento/editar', { saidaEvento: saidaEvento[0] });
        } catch (error) {
            res.status(500).send("Erro ao carregar saída de evento para edição: " + error.message);
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;
            const { evento, dataSaida, horaSaida, responsavel, item, quantidade } = req.body;
            const saidaEvento = new SaidaEventoModel(evento, dataSaida, horaSaida, responsavel, item, quantidade);
            const db = new Database();
            await db.ExecutaComandoNonQuery('UPDATE saidas_eventos SET evento = ?, data_saida = ?, hora_saida = ?, responsavel = ?, item = ?, quantidade = ? WHERE id = ?', [saidaEvento.evento, saidaEvento.dataSaida, saidaEvento.horaSaida, saidaEvento.responsavel, saidaEvento.item, saidaEvento.quantidade, id]);
            res.redirect('/saidas-eventos');
        } catch (error) {
            res.status(500).send("Erro ao atualizar saída de evento: " + error.message);
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM saidas_eventos WHERE id = ?', [id]);
            res.redirect('/saidas-eventos');
        } catch (error) {
            res.status(500).send("Erro ao excluir saída de evento: " + error.message);
        }
    }
}

module.exports = SaidaEventoController;