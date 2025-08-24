const fs = require('fs');
const path = require('path');
const Disciplina = require('../../model/Disciplina');
const TokenJWT = require("../../model/TokenJWT")
module.exports = function (request, response, banco) {

    //npm install multer --save
    //const csv = require('csv-parser'); //npm install csv-parser --save
    const auth = request.headers.authorization
    const jwt = new TokenJWT()
    const validou = jwt.validar(auth)
    const json = require('comment-json')
    const fs = require('fs');


    // Verifica se o arquivo foi enviado
    //#############
    const disciplinas = [];
    if (validou.status == true) {
        fs.readFile(request.file.path, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo JSON:', err);
                return;
            }

            const linhas = data.split('\n');
            // Assumindo que a primeira linha não é um cabeçalho e contém dados
            for (let i = 0; i < linhas.length; i++) {
                const linha = linhas[i].split(',');

                if (linha.length >= 1) { // Verifica se há pelo menos uma coluna
                    const disc = new Disciplina(banco);
                    linha[0] = linha[0].trim();
                    linha[0] = linha[0].replace('\n', '');
                    linha[0] = linha[0].replace('\r', '');
                    linha[0] = linha[0].replace('"', '');
                    linha[0] = linha[0].replace('"', '');
                    linha[0] = linha[0].replace('nomedisc:', '');
                    linha[0] = linha[0].replace('"', '');
                    linha[0] = linha[0].replace('"', '');
                    if (linha[0].length > 5) {
                        disc.nomedisc = linha[0]; // Assumindo que a primeira coluna é 'nome'
                        disc.create();
                        disciplinas.push(disc);
                    }
                }
            }

            const objResposta = {
                cod: 1,
                status: true,
                msg: 'cadastrado com sucesso',
                disciplinas: disciplinas.nomedisc,
                TokenJWT: jwt.gerar(validou.payload)
            }
            response.status(201).send(objResposta);

            // console.log('Cargos:', cargos);
        });
    } else {
        const resposta = {
            status: "false",
            msg: "Token inválido",
            cod: "500",
        }
        response.status(500).send(resposta)
    }



}

