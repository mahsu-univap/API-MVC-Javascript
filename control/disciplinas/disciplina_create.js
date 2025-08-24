const Disciplina = require('../../model/Disciplina')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function(request,response,banco){
    console.log("POST /disciplinas")

        const auth = request.headers.authorization
        const p_nomedisc = request.body.nomedisc
        const jwt = new TokenJWT()
        const validou = jwt.validar(auth)

        if(validou.status==true){
            if(p_nomedisc==""){
                const resposta = {
                    status:"false",
                    msg:"O nome da disciplina não pode ser vazio",
                    cod:"500",
                    dados_cadastrados : {},
                    TokenJWT:jwt.gerar(validou.payload)
                }
                response.status(500).send(resposta)
            }else{
                const disciplina = new Disciplina(banco)
                disciplina.nomedisc = p_nomedisc
                disciplina.create().then(respostaPromise=>{
                    const resposta = {
                        status:"true",
                        msg:"Disciplina cadastrada com sucesso!",
                        cod:"201",
                        dados_cadastrados : {
                          codigodisc:respostaPromise.insertId,
                          nomedisc:p_nomedisc
                        
                        },
                        TokenJWT:jwt.gerar(validou.payload)

                    }
                    response.status(201).send(resposta)
                }).catch(erro=>{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao cadastrar disciplina",
                        cod:"500",
                        dados_cadastrados : {},
                        TokenJWT:jwt.gerar(validou.payload)
                    }
                    response.status(500).send(resposta)
                })
    
                
            }
        }else{
            const resposta = {
                status:"false",
                msg:"Token inválido",
                cod:"500",
            }  
            response.status(500).send(resposta)
        }

        
}