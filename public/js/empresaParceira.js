async function cadastrarEmpresaParceira(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const website = document.getElementById('website').value;
    const tipoParceria = document.getElementById('tipoParceria').value;

    const response = await fetch('/empresas-parceiras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, website, tipoParceria })
    });

    if (response.ok) {
        window.location.href = '/empresas-parceiras';
    } else {
        alert('Erro ao cadastrar empresa parceira');
    }
}

async function atualizarEmpresaParceira(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const website = document.getElementById('website').value;
    const tipoParceria = document.getElementById('tipoParceria').value;

    const response = await fetch(`/empresas-parceiras/${id}/atualizar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone, website, tipoParceria })
    });

    if (response.ok) {
        window.location.href = '/empresas-parceiras';
    } else {
        alert('Erro ao atualizar empresa parceira');
    }
}

async function excluirEmpresaParceira(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/empresas-parceiras/${id}/excluir`, {
        method: 'POST'
    });

    if (response.ok) {
        window.location.href = '/empresas-parceiras';
    } else {
        alert('Erro ao excluir empresa parceira');
    }
}
