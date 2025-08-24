module.exports = class Disciplina{
    constructor(banco){
        this._banco = banco
        this._codigodisc = null
        this._nomedisc = null

    }

    async create(){
        const operacao = new Promise((resolve, reject)=>{
            const nome = this._nomedisc
            const parametros = [nome]
            const sql = "insert into disciplinas (nomedisc) values (?)"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(JSON.stringify(resultados))
                    resolve(JSON.stringify(resultados))
                }
            })

        })
        return operacao
    }

    async read(){
        const operacao = new Promise((resolve, reject)=>{

            const parametros = []
            const sql = "select * from disciplinas order by codigodisc"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(JSON.stringify(resultados))
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async readById(){
        const operacao = new Promise((resolve, reject)=>{
            const id = this._codigodisc
            const parametros = [id]
            const sql = "select * from disciplinas where codigodisc=?"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async update(){
        const operacao = new Promise((resolve, reject)=>{
            const nome = this._nomedisc
            const id = this._codigodisc
            const parametros = [nome,id]
            const sql = "update disciplinas set nomedisc=? where codigodisc=?"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(JSON.stringify(resultados))
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async delete(){
        const operacao = new Promise((resolve, reject)=>{
            const id = this._codigodisc
            const parametros = [id]
            const sql = "delete from disciplinas where codigodisc=?"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(JSON.stringify(resultados))
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    //getter e setters
    set banco(valor){
        this._banco = valor
    }
    get banco(){
        return this._banco
    }

    set codigodisc(codigodisc){
        this._codigodisc = codigodisc
    }
    get codigodisc(){
        return this._codigodisc
    }

    set nomedisc(nomedisc){
        this._nomedisc = nomedisc
    }
    get nomedisc(){
        return this._nomedisc
    }
}