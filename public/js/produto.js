async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const quantidade = document.getElementById('quantidade').value;
    const unidadeMedida = document.getElementById('unidade_medida').value;
    const dataValidade = document.getElementById('data_validade').value;

    const response = await fetch('/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, categoria, quantidade, unidadeMedida, dataValidade })
    });

    if (response.ok) {
        window.location.href = '/produtos';
    } else {
        alert('Erro ao cadastrar produto');
    }
}

async function atualizarProduto(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const quantidade = document.getElementById('quantidade').value;
    const unidadeMedida = document.getElementById('unidade_medida').value;
    const dataValidade = document.getElementById('dataValidade').value;

    const response = await fetch(`/produtos/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, categoria, quantidade, unidadeMedida, dataValidade })
    });

    if (response.ok) {
        window.location.href = '/produtos';
    } else {
        alert('Erro ao atualizar produto');
    }
}

async function excluirProduto(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/produtos/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/produtos';
    } else {
        alert('Erro ao excluir produto');
    }
}