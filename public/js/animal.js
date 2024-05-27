// public/js/animal.js

async function cadastrarAnimal(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const sexo = document.getElementById('sexo').value;
    const porte = document.getElementById('porte').value;
    const temperamento = document.getElementById('temperamento').value;
    const status = document.getElementById('status').value;
    const descricao = document.getElementById('descricao').value;

    const response = await fetch('/animais', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, tipo, sexo, porte, temperamento, status, descricao })
    });

    if (response.ok) {
        window.location.href = '/animais';
    } else {
        alert('Erro ao cadastrar animal');
    }
}

async function atualizarAnimal(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const sexo = document.getElementById('sexo').value;
    const porte = document.getElementById('porte').value;
    const temperamento = document.getElementById('temperamento').value;
    const status = document.getElementById('status').value;
    const descricao = document.getElementById('descricao').value;

    const response = await fetch(`/animais/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, tipo, sexo, porte, temperamento, status, descricao })
    });

    if (response.ok) {
        window.location.href = '/animais';
    } else {
        alert('Erro ao atualizar animal');
    }
}

async function excluirAnimal(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/animais/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/animais';
    } else {
        alert('Erro ao excluir animal');
    }
}