// public/js/saidaEvento.js

async function cadastrarSaidaEvento(event) {
    event.preventDefault();

    const evento = document.getElementById('evento').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const responsavel = document.getElementById('responsavel').value;
    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;

    const response = await fetch('/saidas-eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evento, dataSaida, horaSaida, responsavel, item, quantidade })
    });

    if (response.ok) {
        window.location.href = '/saidas-eventos';
    } else {
        alert('Erro ao cadastrar saída de evento');
    }
}

async function atualizarSaidaEvento(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const evento = document.getElementById('evento').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const responsavel = document.getElementById('responsavel').value;
    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;

    const response = await fetch(`/saidas-eventos/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evento, dataSaida, horaSaida, responsavel, item, quantidade })
    });

    if (response.ok) {
        window.location.href = '/saidas-eventos';
    } else {
        alert('Erro ao atualizar saída de evento');
    }
}

async function excluirSaidaEvento(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/saidas-eventos/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/saidas-eventos';
    } else {
        alert('Erro ao excluir saída de evento');
    }
}
