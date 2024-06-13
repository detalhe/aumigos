const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatbotModel = require('../models/chatbotModel');

class ChatbotController {
    async sendMessage(req, res) {
        try {
            const { message } = req.body;
            const chatbotModel = new ChatbotModel();
            const response = await chatbotModel.sendMessage(message);
            res.json({ response });
        } catch (error) {
            res.status(500).send("Erro ao enviar mensagem: " + error.message);
        }
    }
}

module.exports = ChatbotController;