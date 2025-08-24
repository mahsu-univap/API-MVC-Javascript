const jwt = require('jsonwebtoken')

module.exports = class TokenJWT{
    constructor(){
        this._jsonwebtoken = jwt
        this._jwt_key = "4d15e23a91911195ea5c8b1183472d61"
        this._duracao = 60*60*24 //duração de 24hrs
    }

    gerar(payload){
        const novoToken = this._jsonwebtoken.sign(
            {payload:payload},
            this._jwt_key,
            {expiresIn:this._duracao}
        )

        return novoToken
    }

    validar(token){
        token = this.limpar(token)

        try{
            const payload = this._jsonwebtoken.verify(token,this._jwt_key)
            const resposta = {
                status:true,
                payload:payload
            }
            return resposta
        }catch(erro){
            const resposta = {
                status:false,
                payload:{}
            }
            return resposta
        }
        
    }

    limpar(token){
        token = token.replace('Bearer ','')
        return token
    }
}