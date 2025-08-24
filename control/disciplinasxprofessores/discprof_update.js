const DisciplinaxProfessor = require('../../model/DisciplinaxProfessor')
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {
    console.log("PUT /discprof")

    const p_idDiscProf = request.params.idDiscProf
    const p_curso = request.body.curso
    const p_anoletivo = request.body.anoletivo
    const p_cargahoraria = request.body.cargahoraria
    const p_coddisciplinas = request.body.coddisciplinas
    const p_codprofessores = request.body.codprofessores

    const discxprof = new DisciplinaxProfessor(banco)

    discxprof.idDiscProf = p_idDiscProf
    discxprof.curso = p_curso
    discxprof.anoletivo = p_anoletivo
    discxprof.cargahoraria = p_cargahoraria
    discxprof.disciplinasf.codigodisc = p_coddisciplinas
    discxprof.professoresf.registro = p_codprofessores

    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)

    if (validou.status == true) {
        if (p_idDiscProf == "" || p_curso == "" || p_cargahoraria == "" || p_anoletivo == "" || p_coddisciplinas == "" || p_codprofessores == "") {
            const resposta = {
                status: "false",
                msg: "ERRO! Algum dos campos estão vazios.",
                cod: "500",
                dados_cadastrados: {},
                TokenJWT: jwt.gerar(validou.payload)
            }
            response.status(500).send(resposta)
        } else {
            discxprof.update().then(respostaPromise => {
                const resposta = {
                    status: "true",
                    msg: "Relação atualizada com sucesso!",
                    cod: "201",
                    relação_atualizada: {
                        idDiscProf: p_idDiscProf,
                        curso: p_curso,
                        anoletivo: p_anoletivo,
                        cargahoraria: p_cargahoraria,
                        coddisciplinas: p_coddisciplinas,
                        codprofessores: p_codprofessores,
                        TokenJWT: jwt.gerar(validou.payload)

                    }
                }
                response.status(201).send(resposta)
            }).catch(erro => {
                const resposta = {
                    status: "false",
                    msg: "Erro ao atualizar disciplina",
                    cod: "500",
                    dados_atualizados: {},
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
