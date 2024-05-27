// models/saidaEventoModel.js

class SaidaEventoModel {
    constructor(evento, dataSaida, horaSaida, responsavel, item, quantidade) {
        this.evento = evento;
        this.dataSaida = dataSaida;
        this.horaSaida = horaSaida;
        this.responsavel = responsavel;
        this.item = item;
        this.quantidade = quantidade;
    }
}

module.exports = SaidaEventoModel;