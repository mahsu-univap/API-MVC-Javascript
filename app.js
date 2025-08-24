const express = require('express')
const mysql = require('mysql')
const path = require('path');
const rotas_disciplinas = require("./routes/rotas_disciplinas")
const rotas_discprof = require('./routes/rotas_discprof')
const rotas_professores = require('./routes/rotas_professores')

const app = express()
app.use(express.json())
app.use(express.static('js'))

app.use('/', express.static(__dirname + '/view'))

const porta = 3000

const host = "http://localhost:" + porta
const banco = mysql.createPool({
    connectionLimit: 128,
    host: "localhost",
    user: "root",
    password: "",
    database: "univap"

})

rotas_disciplinas(app, banco)
rotas_discprof(app, banco)
rotas_professores(app, banco)

app.listen(porta, function () {

    console.log("Server running: port " + porta)
    console.log("Host >> " + host)

})