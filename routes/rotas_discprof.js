const{ request, response } = require("express")
const discprof_create = require('../control/disciplinasxprofessores/discprof_create')
const discprof_readall = require('../control/disciplinasxprofessores/discprof_readall')
const discprof_update = require('../control/disciplinasxprofessores/discprof_update')
const discprof_delete = require('../control/disciplinasxprofessores/discprof_delete')
const discprof_readById = require('../control/disciplinasxprofessores/discprof_readById')
module.exports = function(app,banco){

    app.post("/discprof", (request,response)=>{
        discprof_create(request,response,banco)
    })
    app.get("/discprof", (request,response)=>{
        discprof_readall(request,response,banco)
    })
    app.get("/discprof/:idDiscProf", (request,response)=>{
        discprof_readById(request,response,banco)
    })
    app.put("/discprof/:idDiscProf", (request,response)=>{
        discprof_update(request,response,banco)
    })
    app.delete("/discprof/:idDiscProf", (request,response)=>{
        discprof_delete(request,response,banco)
    })
}