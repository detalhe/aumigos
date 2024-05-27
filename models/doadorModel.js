// models/doadorModel.js

class DoadorModel {
    constructor(nome, email, telefone, endereco) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}

module.exports = DoadorModel;
