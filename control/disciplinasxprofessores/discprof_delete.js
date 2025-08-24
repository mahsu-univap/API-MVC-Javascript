const DisciplinaxProfessor = require('../../model/DisciplinaxProfessor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("DELETE /discprof")
    const p_idDiscProf = request.params.idDiscProf

    const discxprof = new DisciplinaxProfessor(banco)
    discxprof.idDiscProf = p_idDiscProf

    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {

        discxprof.delete().then(respostaPromise => {
            const resposta = {
                status: "true",
                msg: "Relação deletada com sucesso!",
                cod: "200",
                relação_deletada: {
                    idDiscProf: p_idDiscProf
                },
                TokenJWT:jwt.gerar(validou.payload)
            }
            response.status(200).send(resposta)
        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao deletar relação.",
                cod: "500",
                relação_deletada: {},
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