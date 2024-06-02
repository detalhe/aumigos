const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
const homeRoute = require("./routes/homeRoute");
const empresaParceiraRoute = require("./routes/empresaParceiraRoute");
const usuarioRoute = require("./routes/usuarioRoute");
const doadorRoute = require("./routes/doadorRoute");
const produtoRoute = require("./routes/produtoRoute");
const animalRoute = require("./routes/animalRoute");
const saidaEventoRoute = require("./routes/saidaEventoRoute");
const relatorioRoute = require("./routes/relatorioRoute");
const loginRoute = require("./routes/loginRoute");
const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(expressEjsLayout);

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use("/login", loginRoute);
app.use(authMiddleware);

app.use("/", homeRoute);
app.use("/empresas-parceiras", empresaParceiraRoute);
app.use("/usuarios", usuarioRoute);
app.use("/doadores", doadorRoute);
app.use("/produtos", produtoRoute);
app.use("/animais", animalRoute);
app.use("/saidas-eventos", saidaEventoRoute);
app.use("/relatorios", relatorioRoute);

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`App rodando na porta ${port}`);
});