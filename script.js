const formulario = document.querySelector('#todoForm');
const Inome = document.querySelector('.nome');
const Idescricao = document.querySelector('.descricao');
const Iprioridade = document.querySelector('.prioridade');
const Irealizado = document.querySelector('.realizado');

// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Menu item active state
const menuItems = document.querySelectorAll('nav ul li');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
    });
});

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();  // Impede o comportamento padrão de envio de formulário
    
    if (validarFormulario()) {
        cadastrar();
        limparCampos();
    }
});

function validarFormulario() {
    let mensagem = "";
    
    // Verifica se os campos obrigatórios foram preenchidos
    if (Inome.value.trim() === "") {
        mensagem += "O nome é obrigatório.\n";
    }
    if (Idescricao.value.trim() === "") {
        mensagem += "A descrição é obrigatória.\n";
    }
    if (Iprioridade.value.trim() === "") {
        mensagem += "A prioridade é obrigatória.\n";
    }

    if (mensagem !== "") {
        alert(mensagem);
        return false;
    }
    return true;
}

function cadastrar() {
    const dados = {
        nome: Inome.value,
        descricao: Idescricao.value,
        prioridade: parseInt(Iprioridade.value),
        realizado: Irealizado.checked
    };

    // Envia os dados para a API
    fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Tarefa cadastrada com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao cadastrar tarefa:', error);
        alert('Erro ao cadastrar a tarefa.');
    });
}

function limparCampos() {
    // Limpa os campos após o envio
    Inome.value = "";
    Idescricao.value = "";
    Iprioridade.value = "";
    Irealizado.checked = false;
}
