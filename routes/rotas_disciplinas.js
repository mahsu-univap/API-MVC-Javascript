const { request, response } = require("express")
const Disciplina = require('../model/Disciplina')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const disciplina_create = require('../control/disciplinas/disciplina_create')
const disciplina_readall = require("../control/disciplinas/disciplina_readall")
const disciplina_update = require("../control/disciplinas/disciplina_update")
const disciplina_delete = require("../control/disciplinas/disciplina_delete")
const disciplina_readById = require("../control/disciplinas/disciplina_readById")
const disciplina_createJson = require("../control/disciplinas/disciplina_createJson")
module.exports = function(app,banco){

    app.post("/disciplinas",(request, response)=>{
        disciplina_create(request,response,banco)
    })
    app.post('/disciplinasjson', upload.single('file'), (request, response) => {

        if (!request.file) {
            return response.status(400).send({
                cod: 0,
                status: false,
                msg: "Nenhum arquivo foi enviado."
            });
        }else{
            disciplina_createJson(request,response,banco)
        }

    })
    app.get("/disciplinas",(request, response)=>{
        disciplina_readall(request,response,banco)
    })
    app.get("/disciplinas/:codigodisc",(request, response)=>{
        disciplina_readById(request,response,banco)
    })
    app.put("/disciplinas/:codigodisc",(request, response)=>{
        disciplina_update(request,response,banco)
    })
    app.delete("/disciplinas/:codigodisc",(request, response)=>{
        disciplina_delete(request,response,banco)
    })
}