const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');
let homeRoute = require("./routes/homeRoute");
const empresaParceiraRoute = require("./routes/empresaParceiraRoute");
const usuarioRoute = require("./routes/usuarioRoute");
const doadorRoute = require("./routes/doadorRoute");
const produtoRoute = require("./routes/produtoRoute");
const animalRoute = require("./routes/animalRoute");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(expressEjsLayout);

app.use("/", homeRoute);
app.use("/empresas-parceiras", empresaParceiraRoute);
app.use("/usuarios", usuarioRoute);
app.use("/doadores", doadorRoute);
app.use("/produtos", produtoRoute);
app.use("/animais", animalRoute);

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`App rodando na porta ${port}`);
});
