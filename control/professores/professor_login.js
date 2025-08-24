const md5 = require("md5")
const Professor = require("../../model/Professor")
const TokenJWT = require("../../model/TokenJWT")
module.exports= function(request,response,banco){
    console.log("POSTlogin /login")


        const p_email =request.body.email
        const p_senha =request.body.senha
        const prof = new Professor(banco)

            prof.email = p_email
            prof.senha = p_senha
            const senha_cripto = md5(p_senha)

        if(p_email==""||p_senha==""){
            const resposta = {
                status:"false",
                msg:"Nenhum campo pode ser vazio.",
                cod:"500",
                dados_de_login : {}
            }
            response.status(500).send(resposta)
        }else{
            prof.login().then(respostaPromise=>{
                
                if(respostaPromise.senha==senha_cripto&&respostaPromise.email==p_email){

                    resposta = {
                        status:true,
                        cod:"201",
                        msg:"Login realizado com sucesso!",
                        dados_de_login : {
                            email:p_email,
                            senha:""
                        }
                    }
                   if(resposta.status==true){
    
                    const jwt = new TokenJWT()
                    
                    const token = jwt.gerar(resposta.dados_de_login)
                    resposta = {
                        status:true,
                        cod:"201",
                        msg:"Login realizado com sucesso!",
                        dados_de_login : {
                            email:p_email,
                            senha:""
                        },
                        TokenJWT_gerado:token
                    }
                    response.status(201).send(resposta)
                   }else{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao fazer login. Autenticação falhou",
                        cod:"500",
                        dados_de_login : {}
                    }
                    response.status(500).send(resposta)
                   }
                }else{
                    const resposta = {
                        status:"false",
                        msg:"Erro ao fazer login. Dados Inválidos",
                        cod:"500",
                        dados_de_login : {}
                    }
                    response.status(500).send(resposta)
                }
                
                
            }).catch(erro=>{
                const resposta = {
                    status:"false",
                    msg:"Erro ao fazer login",
                    cod:"500",
                    dados_de_login : {}
                }
                response.status(500).send(resposta)
            })

            
        }

}