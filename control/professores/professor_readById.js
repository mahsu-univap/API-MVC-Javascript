const Professor = require('../../model/Professor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("GETid /Professores")

    const p_registro = request.params.registro


    const prof = new Professor(banco)

    prof.registro = p_registro
    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        prof.readById().then(respostaPromise => {
            if (respostaPromise == "") {
                const resposta = {
                    status: "false",
                    msg: "Professor não encontrado, revise o ID.",
                    cod: "500",
                    TokenJWT:jwt.gerar(validou.payload)
                }
                response.status(404).send(resposta)
            } else {
                const resposta = {
                    status: "true",
                    msg: "Sucesso!",
                    cod: "200",
                    dados_lidos: respostaPromise,
                    TokenJWT:jwt.gerar(validou.payload)
                }
                response.status(200).send(resposta)
            }

        }).catch(erro => {
            const resposta = {
                status: "false",
                msg: "Erro ao ler Professors.",
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
