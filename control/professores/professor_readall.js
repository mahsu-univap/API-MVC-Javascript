const Professor = require('../../model/Professor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("GET /Professores")


    const prof = new Professor(banco)
    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        prof.read().then(respostaPromise => {
            const resposta = {
                status: "true",
                msg: "Sucesso!",
                cod: "200",
                dados_lidos: respostaPromise,
                TokenJWT:jwt.gerar(validou.payload)
            }
            response.status(201).send(resposta)
        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao ler Professores.",
                cod: "500",
                dados_lidos: {},
                TokenJWT:jwt.gerar(validou.payload)
            }
            response.status(500).send(resposta)
        })
    } else {
        const resposta = {
            status: "false",
            msg: "Token inválido",
            cod: "500",
        }
        response.status(500).send(resposta)
    }



}