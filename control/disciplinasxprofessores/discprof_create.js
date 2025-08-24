const DisciplinaxProfessor = require('../../model/DisciplinaxProfessor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {

    const idDiscProf = request.body.idDiscProf
    const curso = request.body.curso
    const cargahoraria = request.body.cargahoraria
    const anoletivo = request.body.anoletivo
    const coddisciplinas = request.body.coddisciplinas
    const codprofessores = request.body.codprofessores

    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        if (idDiscProf == "" || curso == "" || cargahoraria == "" || anoletivo == "" || coddisciplinas == "" || codprofessores == "") {
            const resposta = {
                status: "false",
                msg: "ERRO! Algum dos campos estão vazios.",
                cod: "500",
                dados_cadastrados: {},
                TokenJWT:jwt.gerar(validou.payload)
            }
            response.status(500).send(resposta)
        } else {
            const discxprof = new DisciplinaxProfessor(banco)
            discxprof.curso = curso
            discxprof.cargahoraria = cargahoraria
            discxprof.anoletivo = anoletivo
            discxprof.disciplinasf.codigodisc = coddisciplinas
            discxprof.professoresf.registro = codprofessores
            discxprof.create().then(respostaPromise => {
                const resposta = {
                    status: "true",
                    msg: "Relação cadastrada com sucesso!",
                    cod: "201",
                    dados_cadastrados: {
                        idDiscProf: respostaPromise.insertId,
                        curso: curso,
                        cargahoraria: cargahoraria,
                        anoletivo: anoletivo,
                        coddisciplinas: coddisciplinas,
                        codprofessores: codprofessores,
                        TokenJWT:jwt.gerar(validou.payload)

                    }
                }
                response.status(201).send(resposta)
            }).catch(erro => {
                const resposta = {
                    status: "false",
                    msg: "Erro ao cadastrar relação",
                    cod: "500",
                    dados_cadastrados: {},
                    TokenJWT:jwt.gerar(validou.payload)
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