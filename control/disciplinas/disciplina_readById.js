const Disciplina = require('../../model/Disciplina')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function(request,response,banco){
    console.log("READid /disciplinas")

            const auth = request.headers.authorization
            const p_codigodisc = request.params.codigodisc

            const jwt = new TokenJWT()
            const validou = jwt.validar(auth)
        
            const disc = new Disciplina(banco)
            disc.codigodisc = p_codigodisc

            if(validou.status==true){
                disc.readById().then(respostaPromise=>{
                    if(respostaPromise==""){
                        const resposta = {
                            status:"false",
                            msg:"Disciplina não encontrada, revise o ID.",
                            cod:"500",
                            TokenJWT:jwt.gerar(validou.payload)
                        }
                        response.status(404).send(resposta)
                    }else{
                        const resposta = {
                            status:"true",
                            msg:"Disciplina encontrada com sucesso!",
                            cod:"200",
                            disciplina_encontrada : {
                                respostaPromise
                            },
                            TokenJWT:jwt.gerar(validou.payload)
                        }
                        response.status(200).send(resposta)
                    }
                }).catch(erro=>{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao encontrar disciplina.",
                        cod:"500",
                        erro:erro,
                        relação_encontrada : {},
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