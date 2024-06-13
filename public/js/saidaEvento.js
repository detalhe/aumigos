async function cadastrarSaidaEvento(event) {
    event.preventDefault();

    const evento = document.getElementById('evento').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const horaSaida = document.getElementById('horaSaida').value;
    const responsaveis = Array.from(document.getElementById('responsaveis').selectedOptions).map(option => option.value);
    const produtos = Array.from(document.querySelectorAll('#produtos .form-check-input:checked')).map(checkbox => {
        const produtoId = checkbox.value;
        const quantidade = document.getElementById(`quantidade_${produtoId}`).value;
        return { produtoId, quantidade };
    });

    const data = { evento, dataSaida, horaSaida, responsaveis, produtos };
    console.log('Dados enviados:', data);

    const response = await fetch('/saidas-eventos/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        window.location.href = '/saidas-eventos';
    } else {
        alert('Erro ao cadastrar saída de evento');
    }
}


async function atualizarSaidaEvento(event) {
    event.preventDefault();
  
    const form = document.getElementById('editarSaidaEventoForm');
    const formData = new FormData(form);
  
    const id = formData.get('id');
    const evento = formData.get('evento');
    const dataSaida = formData.get('dataSaida');
    const horaSaida = formData.get('horaSaida');
    const responsaveis = formData.getAll('responsaveis[]');
  
    const data = { id, evento, dataSaida, horaSaida, responsaveis };
    console.log('Dados enviados:', data);
  
    const response = await fetch(`/saidas-eventos/${id}/atualizar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
