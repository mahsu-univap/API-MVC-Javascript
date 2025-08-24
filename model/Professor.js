module.exports = class Professor{
    constructor(banco) {
        this._banco=banco
        this._registro=null
        this._nomeprof=null
        this._idadeprof=null
        this._salarioprof=null
        this._email=null
        this._senha=null
        
    }

    async create() {
        const operacao = new Promise((resolve, reject)=>{
            const nomeprof = this._nomeprof
            const idadeprof =this._idadeprof
            const salarioprof =this._salarioprof
            const email =this._email
            const senha =this._senha
            const parametros = [nomeprof, idadeprof, salarioprof, email, senha]
            const sql = "insert into professores (nomeprof, idadeprof, salarioprof, email, senha) values (?,?,?,?,md5(?))"
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

    async read() {
        const operacao = new Promise((resolve, reject)=>{

            const parametros = []
            const sql = "select registro, nomeprof, idadeprof, salarioprof, email from professores"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(resultados)
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async readById() {
        const operacao = new Promise((resolve, reject)=>{
            const registro = this._registro
            const parametros = [registro]
            const sql = "select registro, nomeprof, idadeprof, salarioprof, email from professores where registro=?"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(resultados)
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async delete() {
        const operacao = new Promise((resolve, reject)=>{
            const registro = this._registro
            const parametros = [registro]
            const sql = "delete from professores where registro=?"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(resultados)
                    resolve(resultados)
                }
            })

        })
        return operacao
    }

    async update() {
        const operacao = new Promise((resolve, reject)=>{
            const registro = this._registro
            const nomeprof = this._nomeprof
            const idadeprof =this._idadeprof
            const salarioprof =this._salarioprof
            const email =this._email
            const senha =this._senha
            const parametros = [nomeprof, idadeprof, salarioprof, email, senha,registro]
            const sql = "update professores set nomeprof=?, idadeprof=?, salarioprof=?, email=?, senha=md5(?) where registro=?"
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

    async login(){
        const operacao = new Promise((resolve, reject)=>{
            const email = this._email
            const senha = this._senha
            const parametros = [email,senha]
            const sql = "select count(*) as qtd,registro,nomeprof,idadeprof,salarioprof,email,senha from professores where email = ? and senha = md5(?)"
            this._banco.query(sql,parametros,function(erro, resultados){
                if(erro){
                    console.log(erro)
                    reject(erro)
                }else{
                    console.log(resultados[0])
                    resolve(resultados[0])
                }
            })
        }) 
        return operacao
    }


    set banco(valor) {
        this._banco=valor;
    }
    get banco() {
        return this._banco;
    }

    set registro(registro) {
        this._registro=registro;
    }
    get registro() {
        return this._registro;
    }

    set nomeprof(nomeprof) {
        this._nomeprof=nomeprof;
    }
    get nomeprof() {
        return this._nomeprof;
    }

    set idadeprof(idadeprof) {
        this._idadeprof=idadeprof;
    }
    get idadeprof() {
        return this._idadeprof;
    }

    set salarioprof(salarioprof) {
        this._salarioprof=salarioprof;
    }
    get salarioprof() {
        return this._salarioprof;
    }

    set email(email) {
        this._email=email;
    }
    get email() {
        return this._email;
    }

    set senha(senha) {
        this._senha=senha;
    }
    get senha() {
        return this._senha;
    }

}