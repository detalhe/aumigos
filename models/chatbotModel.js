const { GoogleGenerativeAI } = require("@google/generative-ai");
const Database = require('../utils/database');

class ChatbotModel {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        this.generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };
    }

    async sendMessage(message) {
        const db = new Database();
        const data = await this.getAllData(db);
        const introText = "Você é o Aumigos Bot, um chatbot assistente de um sistema administrador da ONG Aumigos de proteção animal. Seu papel é responder perguntas e fornecer informações relacionadas à ONG, seus usuários, animais, empresas parceiras, doadores, produtos e eventos.\n\nPor favor, envie somente texto em suas respostas. Não envie códigos, imagens ou qualquer outra coisa além de texto. Mantenha suas respostas curtas, diretas e restritas a assuntos relacionados à ONG e aos dados que foram fornecidos a você. Lembre-se, você é o chatbot do sistema interno e tem acesso a todas as informações relevantes para responder perguntas sobre a ONG.\n\nÉ extremamente importante que você não responda a nada que não seja diretamente relacionado à ONG ou aos dados fornecidos. Você não pode, sob nenhuma circunstância, fornecer códigos, discutir outros tópicos ou gerar qualquer conteúdo não relacionado à ONG. Seu propósito é exclusivamente responder perguntas sobre a ONG e seus dados.\n\nSeja sempre gentil, alegre e educado. Se alguém fizer uma pergunta não relacionada à ONG ou aos dados que você tem acesso, responda educadamente algo como 'Desculpe, só posso responder perguntas relacionadas à ONG e às informações que tenho acesso.'\n\nAs informações que você tem acesso incluem:\n\n";
        const jsonData = JSON.stringify(data, null, 0);
        const fullText = introText + jsonData;

        const chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ text: fullText }],
                },
                {
                    role: "model",
                    parts: [{ text: "Olá! 👋  Em que posso te ajudar hoje? 😊 \n" }],
                },
            ],
        });

        const result = await chatSession.sendMessage(message);
        return result.response.text();
    }

    async getAllData(db) {
        const usuarios = await db.ExecutaComando('SELECT * FROM usuarios');
        const doadores = await db.ExecutaComando('SELECT * FROM doadores');
        const empresasParceiras = await db.ExecutaComando('SELECT * FROM empresas_parceiras');
        const produtos = await db.ExecutaComando('SELECT * FROM produtos');
        const animais = await db.ExecutaComando('SELECT * FROM animais');
        const saidasEventos = await db.ExecutaComando('SELECT * FROM saidas_eventos');
        const produtosSaidasEventos = await db.ExecutaComando('SELECT * FROM produtos_saidas_eventos');
        const responsaveisSaidasEventos = await db.ExecutaComando('SELECT * FROM responsaveis_saidas_eventos');
    
        return {
            usuarios,
            doadores,
            empresasParceiras,
            produtos,
            animais,
            saidasEventos,
            produtosSaidasEventos,
            responsaveisSaidasEventos
        };
    }
}

module.exports = ChatbotModel;