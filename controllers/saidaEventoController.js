//controllers/saidaEventoController.js
const Database = require('../utils/database');
const SaidaEventoModel = require('../models/saidaEventoModel');

class SaidaEventoController {
    async listar(req, res) {
        try {
            const db = new Database();
            const saidasEventos = await db.ExecutaComando('SELECT * FROM saidas_eventos');
            const produtosSaida = await db.ExecutaComando('SELECT * FROM produtos_saidas_eventos');
            const responsaveisSaida = await db.ExecutaComando('SELECT * FROM responsaveis_saidas_eventos');
            const produtosList = await db.ExecutaComando('SELECT * FROM produtos');
            const usuarios = await db.ExecutaComando('SELECT * FROM usuarios WHERE tipo IN ("administrador", "voluntario")');

            res.render('saidaEvento/listar', { saidasEventos, produtosSaida, responsaveisSaida, produtosList, usuarios });
        } catch (error) {
            res.status(500).send("Erro ao listar saídas de eventos: " + error.message);
        }
    }

    async exibirFormularioCadastro(req, res) {
        try {
            const db = new Database();
            const produtos = await db.ExecutaComando('SELECT * FROM produtos');
            const usuarios = await db.ExecutaComando('SELECT * FROM usuarios WHERE tipo IN ("administrador", "voluntario")');
            res.render('saidaEvento/cadastrar', { produtos, usuarios });
        } catch (error) {
            res.status(500).send("Erro ao exibir formulário de cadastro: " + error.message);
        }
    }

    async cadastrar(req, res) {
        try {
            const { evento, dataSaida, horaSaida, responsaveis, produtos } = req.body;
            console.log('Produtos recebidos:', produtos);
            const saidaEvento = new SaidaEventoModel(evento, dataSaida, horaSaida, produtos, responsaveis);
            const db = new Database();
            const result = await db.ExecutaComandoLastInserted('INSERT INTO saidas_eventos (evento, data_saida, hora_saida) VALUES (?, ?, ?)', [saidaEvento.evento, saidaEvento.dataSaida, saidaEvento.horaSaida]);
    
            for (const produto of saidaEvento.produtos) {
                if (produto.produtoId && produto.quantidade) {
                    await db.ExecutaComandoNonQuery('INSERT INTO produtos_saidas_eventos (saida_evento_id, produto_id, quantidade) VALUES (?, ?, ?)', [result, produto.produtoId, produto.quantidade]);
                    await db.ExecutaComandoNonQuery('UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?', [produto.quantidade, produto.produtoId]);
                }
            }
    
            for (const responsavel of saidaEvento.responsaveis) {
                await db.ExecutaComandoNonQuery('INSERT INTO responsaveis_saidas_eventos (saida_evento_id, usuario_id) VALUES (?, ?)', [result, responsavel]);
            }
    
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
            const produtos = await db.ExecutaComando('SELECT * FROM produtos');
            const usuarios = await db.ExecutaComando('SELECT * FROM usuarios WHERE tipo IN ("administrador", "voluntario")');
            const produtosSaida = await db.ExecutaComando('SELECT * FROM produtos_saidas_eventos WHERE saida_evento_id = ?', [id]);
            const responsaveisSaida = await db.ExecutaComando('SELECT * FROM responsaveis_saidas_eventos WHERE saida_evento_id = ?', [id]);
    
            res.render('saidaEvento/editar', {
                saidaEvento: saidaEvento[0],
                produtos,
                usuarios,
                produtosSaida,
                responsaveisSaida
            });
        } catch (error) {
            res.status(500).send("Erro ao carregar saída de evento para edição: " + error.message);
        }
    }
    
    async atualizar(req, res) {
        try {
          const id = req.params.id;
          const { evento, dataSaida, horaSaida, responsaveis } = req.body;
          const saidaEvento = new SaidaEventoModel(evento, dataSaida, horaSaida, null, responsaveis);
          const db = new Database();
      
          await db.ExecutaComandoNonQuery('UPDATE saidas_eventos SET evento = ?, data_saida = ?, hora_saida = ? WHERE id = ?', [saidaEvento.evento, saidaEvento.dataSaida, saidaEvento.horaSaida, id]);
      
          const responsaveisExistentes = await db.ExecutaComando('SELECT usuario_id FROM responsaveis_saidas_eventos WHERE saida_evento_id = ?', [id]);
          const responsaveisExistentesIds = responsaveisExistentes.map(r => r.usuario_id);
          const responsaveisRemovidos = responsaveisExistentesIds.filter(r => !saidaEvento.responsaveis.includes(r.toString()));
          for (const responsavel of responsaveisRemovidos) {
            await db.ExecutaComandoNonQuery('DELETE FROM responsaveis_saidas_eventos WHERE saida_evento_id = ? AND usuario_id = ?', [id, responsavel]);
          }
      
          for (const responsavel of saidaEvento.responsaveis) {
            if (!responsaveisExistentesIds.includes(parseInt(responsavel))) {
              await db.ExecutaComandoNonQuery('INSERT INTO responsaveis_saidas_eventos (saida_evento_id, usuario_id) VALUES (?, ?)', [id, responsavel]);
            }
          }
      
          res.redirect('/saidas-eventos');
        } catch (error) {
          res.status(500).send("Erro ao atualizar saída de evento: " + error.message);
        }
      }
    
    async excluir(req, res) {
        try {
            const id = req.params.id;
            const db = new Database();
            await db.ExecutaComandoNonQuery('DELETE FROM produtos_saidas_eventos WHERE saida_evento_id = ?', [id]);
            await db.ExecutaComandoNonQuery('DELETE FROM responsaveis_saidas_eventos WHERE saida_evento_id = ?', [id]);
            await db.ExecutaComandoNonQuery('DELETE FROM saidas_eventos WHERE id = ?', [id]);
            res.redirect('/saidas-eventos');
        } catch (error) {
            res.status(500).send("Erro ao excluir saída de evento: " + error.message);
        }
    }
}

module.exports = SaidaEventoController;
