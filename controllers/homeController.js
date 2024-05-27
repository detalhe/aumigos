class HomeController {
    constructor() {
    }

    async homeView(req, res) {
        try {
            res.render('home');
        } catch (error) {
            res.status(500).send("Erro ao carregar página inicial: " + error.message);
        }
    }
}

module.exports = HomeController;