class UsuarioModel {
    constructor(nome, email, senha, tipo, cargo, status) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.cargo = cargo;
        this.status = status;
    }
}

module.exports = UsuarioModel;
