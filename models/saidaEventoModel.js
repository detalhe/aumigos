class SaidaEventoModel {
    constructor(evento, dataSaida, horaSaida, produtos, responsaveis) {
        this.evento = evento;
        this.dataSaida = dataSaida;
        this.horaSaida = horaSaida;
        this.produtos = Array.isArray(produtos) ? produtos : [];
        this.responsaveis = responsaveis;
    }
}

module.exports = SaidaEventoModel;
