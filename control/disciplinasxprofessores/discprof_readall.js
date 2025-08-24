const DisciplinaxProfessor = require('../../model/DisciplinaxProfessor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("GET /discxprof")


    const discxprof = new DisciplinaxProfessor(banco)

    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {

        discxprof.read().then(respostaPromise => {
            const resposta = {
                status: "true",
                msg: "Sucesso!",
                cod: "200",
                dados_lidos: respostaPromise,
                TokenJWT: jwt.gerar(validou.payload)
            }
            response.status(200).send(resposta)
        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao ler relações.",
                cod: "500",
                dados_lidos: {},
                TokenJWT: jwt.gerar(validou.payload)
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