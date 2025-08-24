const Disciplina = require('../../model/Disciplina')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function(request,response,banco){
    console.log("DELETE /disciplinas")

            const auth = request.headers.authorization
            const p_codigodisc = request.params.codigodisc
            
            const jwt = new TokenJWT()
            const validou = jwt.validar(auth)
            const disciplina = new Disciplina(banco)
            disciplina.codigodisc = p_codigodisc

            if(validou.status==true){
                disciplina.delete().then(respostaPromise=>{
                    const resposta = {
                        status:"true",
                        msg:"Disciplina deletada com sucesso!",
                        cod:"200",
                        disciplina_deletada : {
                            codigodisc:p_codigodisc
                        },
                        TokenJWT:jwt.gerar(validou.payload)
                    }
                    response.status(201).send(resposta)
                }).catch(erro=>{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao deletar disciplina.",
                        cod:"500",
                        dados_lidos : {},
                        TokenJWT:jwt.gerar(validou.payload)
                    }
                    response.status(500).send(resposta)
                })
            }else{
                const resposta = {
                    status:"false",
                    msg:"Token inválido",
                    cod:"500",
                }  
                response.status(500).send(resposta) 
            }
            
       
 }