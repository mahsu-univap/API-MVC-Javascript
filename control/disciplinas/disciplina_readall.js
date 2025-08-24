const Disciplina = require('../../model/Disciplina')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function(request,response,banco){
    console.log("GET /disciplinas")

            const auth = request.headers.authorization
            const jwt = new TokenJWT()
            const validou = jwt.validar(auth)

            const disciplina = new Disciplina(banco)
            if(validou.status==true){
                disciplina.read().then(respostaPromise=>{
                    const resposta = {
                        status:"true",
                        msg:"Sucesso!",
                        cod:"200",
                        dados_lidos : respostaPromise,
                        TokenJWT:jwt.gerar(validou.payload)
                    }
                    response.status(201).send(resposta)
                }).catch(erro=>{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao ler disciplinas.",
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
