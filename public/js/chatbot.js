document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", sendMessage);
});

async function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    messageInput.value = "";

    addMessage(message, true); // Adiciona a mensagem do usuário

    try {
        const response = await fetch("/chatbot/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            const data = await response.json();
            addMessage(data.response, false); // Adiciona a resposta do bot
        } else {
            throw new Error("Erro ao enviar mensagem");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao enviar mensagem");
    }
}

function addMessage(message, isUserMessage) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUserMessage ? 'user-message' : 'bot-message');

    const iconElement = document.createElement('i');
    iconElement.classList.add('fas');
    iconElement.classList.add(isUserMessage ? 'fa-user' : 'fa-robot');
    iconElement.classList.add('message-icon');

    const textElement = document.createElement('div');
    textElement.classList.add('message-text');
    textElement.textContent = message;

    messageElement.appendChild(iconElement);
    messageElement.appendChild(textElement);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addPlaceholderMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const placeholderMessage = chatMessages.querySelector('.bot-message');

    if (!placeholderMessage) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');

        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', 'fa-robot', 'message-icon');

        const textElement = document.createElement('div');
        textElement.classList.add('message-text');
        textElement.textContent = 'Olá! Eu sou o AuBot, seu assistente virtual. Como posso ajudar você hoje?';

        messageElement.appendChild(iconElement);
        messageElement.appendChild(textElement);
        chatMessages.appendChild(messageElement);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", sendMessage);

    addPlaceholderMessage(); // Adiciona a mensagem de padrão
});
