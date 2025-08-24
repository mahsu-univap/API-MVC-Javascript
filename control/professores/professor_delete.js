const Professor = require('../../model/Professor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("DELETE /Professores")
    const p_registro = request.params.registro

    const prof = new Professor(banco)
    prof.registro = p_registro
    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        prof.delete().then(respostaPromise => {
            const resposta = {
                status: "true",
                msg: "Professor deletado com sucesso!",
                cod: "200",
                Professor_deletado: {
                    registro: p_registro
                },
                TokenJWT: jwt.gerar(validou.payload)
            }
            response.status(201).send(resposta)
        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao deletar Professor.",
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