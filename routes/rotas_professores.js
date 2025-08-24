const{ request, response } = require("express")
const professor_create = require('../control/professores/professor_create')
const professor_readall = require('../control/professores/professor_readall')
const professor_readById = require('../control/professores/professor_readById')
const professor_update = require('../control/professores/professor_update')
const professor_delete = require('../control/professores/professor_delete')
const professor_login = require('../control/professores/professor_login')
module.exports = function(app,banco){

    app.post("/login", (request,response)=>{
        professor_login(request,response,banco)
    })
    app.post("/professores", (request,response)=>{
        professor_create(request,response,banco)
    })
    app.get("/professores", (request,response)=>{
        professor_readall(request,response,banco)
    })
    app.get("/professores/:registro", (request,response)=>{
        professor_readById(request,response,banco)
    })
    app.put("/professores/:registro", (request,response)=>{
        professor_update(request,response,banco)
    })
    app.delete("/professores/:registro", (request,response)=>{
        professor_delete(request,response,banco)
    })
}