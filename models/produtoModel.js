class ProdutoModel {
    constructor(nome, categoria, quantidade, unidadeMedida, dataValidade) {
        this.nome = nome;
        this.categoria = categoria;
        this.quantidade = quantidade;
        this.unidadeMedida = unidadeMedida;
        this.dataValidade = dataValidade;
    }
}

module.exports = ProdutoModel;