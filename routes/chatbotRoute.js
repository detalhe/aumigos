const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbotController');

const chatbotController = new ChatbotController();

router.post('/send-message', chatbotController.sendMessage);

module.exports = router;