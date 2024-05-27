// public/js/usuario.js

async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;
    const cargo = document.getElementById('cargo').value;
    const status = document.getElementById('status').value;

    const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, tipo, cargo, status })
    });

    if (response.ok) {
        window.location.href = '/usuarios';
    } else {
        alert('Erro ao cadastrar usuário');
    }
}

async function atualizarUsuario(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;
    const cargo = document.getElementById('cargo').value;
    const status = document.getElementById('status').value;

    const response = await fetch(`/usuarios/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, tipo, cargo, status })
    });

    if (response.ok) {
        window.location.href = '/usuarios';
    } else {
        alert('Erro ao atualizar usuário');
    }
}

async function excluirUsuario(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/usuarios/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/usuarios';
    } else {
        alert('Erro ao excluir usuário');
    }
}
