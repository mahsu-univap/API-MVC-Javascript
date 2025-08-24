const Professor = require('../../model/Professor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("PUT /Professores")

    const p_registro = request.params.registro
    const p_nomeprof = request.body.nomeprof
    const p_idadeprof = request.body.idadeprof
    const p_salarioprof = request.body.salarioprof
    const p_email = request.body.email
    const p_senha = request.body.senha
    const prof = new Professor(banco)

    prof.registro = p_registro
    prof.nomeprof = p_nomeprof
    prof.idadeprof = p_idadeprof
    prof.salarioprof = p_salarioprof
    prof.email = p_email
    prof.senha = p_senha
    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        if (p_nomeprof == "" || p_idadeprof == "" || p_salarioprof == "" || p_email == "" || p_senha == "") {
            const resposta = {
                status: "false",
                msg: "Nenhum campo pode ser vazio.",
                cod: "500",
                dados_atualizados: {}
            }
            response.status(500).send(resposta)
        } else {
            prof.update().then(respostaPromise => {
                const resposta = {
                    status: "true",
                    msg: "Professor atualizado com sucesso!",
                    cod: "201",
                    Professor_atualizada: {
                        registro: p_registro,
                        nomeprof: p_nomeprof,
                        idadeprof: p_idadeprof,
                        salarioprof: p_salarioprof,
                        email: p_email,
                        senha: {},
                        TokenJWT: jwt.gerar(validou.payload)

                    }
                }
                response.status(201).send(resposta)
            }).catch(erro => {
                const resposta = {
                    status: "false",
                    msg: "Erro ao atualizar Professor",
                    cod: "500",
                    dados_cadastrados: {},
                    TokenJWT: jwt.gerar(validou.payload)
                }
                response.status(500).send(resposta)
            })
        }

    } else {
        const resposta = {
            status: "false",
            msg: "Token inválido",
            cod: "500",
        }
        response.status(500).send(resposta)
    }

}