const Database = require('../utils/database');

class HomeController {
    constructor() {}

    async homeView(req, res) {
        try {
            const db = new Database();

            const usuariosCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM usuarios');
            const animaisCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM animais');
            const empresasParceirasCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM empresas_parceiras');
            const doadoresCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM doadores');
            const produtosCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM produtos');
            const saidasEventosCount = await db.ExecutaComando('SELECT COUNT(*) as count FROM saidas_eventos');

            const animalPorTipo = await db.ExecutaComando(`
                SELECT tipo, COUNT(*) as count 
                FROM animais
                WHERE tipo IN ('Cachorro', 'Gato', 'Pássaro')
                GROUP BY tipo
            `);

            const animalPorPorte = await db.ExecutaComando(`
                SELECT porte, COUNT(*) as count 
                FROM animais
                GROUP BY porte
            `);

            res.render('home', {
                usuariosCount: usuariosCount[0].count,
                animaisCount: animaisCount[0].count,
                empresasParceirasCount: empresasParceirasCount[0].count,
                doadoresCount: doadoresCount[0].count,
                produtosCount: produtosCount[0].count,
                saidasEventosCount: saidasEventosCount[0].count,
                animalPorTipo: animalPorTipo,
                animalPorPorte: animalPorPorte
            });
        } catch (error) {
            res.status(500).send("Erro ao carregar página inicial: " + error.message);
        }
    }
}

module.exports = HomeController;