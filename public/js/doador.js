async function cadastrarDoador(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const response = await fetch('/doadores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, endereco })
    });

    if (response.ok) {
        window.location.href = '/doadores';
    } else {
        alert('Erro ao cadastrar doador');
    }
}

async function atualizarDoador(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    const response = await fetch(`/doadores/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, endereco })
    });

    if (response.ok) {
        window.location.href = '/doadores';
    } else {
        alert('Erro ao atualizar doador');
    }
}

async function excluirDoador(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/doadores/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/doadores';
    } else {
        alert('Erro ao excluir doador');
    }
}
