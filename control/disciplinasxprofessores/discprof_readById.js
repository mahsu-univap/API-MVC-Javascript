const DisciplinaxProfessor = require('../../model/DisciplinaxProfessor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("READid /discprof")
    const p_idDiscProf = request.params.idDiscProf

    const discxprof = new DisciplinaxProfessor(banco)
    discxprof.idDiscProf = p_idDiscProf

    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        discxprof.readById().then(respostaPromise => {
            if (respostaPromise == "") {
                const resposta = {
                    status: "false",
                    msg: "Relação não encontrada, revise o ID.",
                    cod: "500",
                    TokenJWT:jwt.gerar(validou.payload)
                }
                response.status(404).send(resposta)
            } else {
                const resposta = {
                    status: "true",
                    msg: "Relação encontrada com sucesso!",
                    cod: "200",
                    relação_encontrada: {
                        respostaPromise
                    },
                    TokenJWT:jwt.gerar(validou.payload)
                }
                response.status(200).send(resposta)
            }
        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao encontrar relação.",
                cod: "500",
                relação_encontrada: {},
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