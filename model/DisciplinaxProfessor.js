module.exports = class DiscplinaxProfessor{
    constructor(banco){
        this._banco = banco
        this._idDiscProf =null
        this._curso=null
        this._cargahoraria =null
        this._anoletivo=null
        this._disciplinasf={
            nomedisc:null,
            codigodisc:null
        }
        this._professoresf={
            registro:null,
            nomeprof:null,
            idadeprof:null,
            salarioprof:null,
            email:null,
            senha:null
        }
        
    }

    async create(){
        const operacao = new Promise((resolve, reject) => {
            const curso = this._curso 
            const cargahoraria = this._cargahoraria
            const anoletivo = this._anoletivo 
            const coddisciplinas = this._disciplinasf.codigodisc
            const codprofessores = this._professoresf.registro
            const parametros = [curso, cargahoraria, anoletivo, coddisciplinas, codprofessores]
            
            const sql = "insert into disciplinasxprofessores (curso, cargahoraria, anoletivo, coddisciplinas, codprofessores) values(?,?,?,?,?)"
            this._banco.query(sql,parametros,function(erro,resultado){
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
        return operacao
    }

    async update(){
        const operacao = new Promise((resolve, reject) => {
            const idDiscProf=this._idDiscProf
            const curso = this._curso 
            const cargahoraria = this._cargahoraria
            const anoletivo = this._anoletivo 
            const coddisciplinas = this._disciplinasf.codigodisc
            const codprofessores = this._professoresf.registro
            const parametros = [curso, cargahoraria, anoletivo, coddisciplinas, codprofessores,idDiscProf]
            
            const sql = "update disciplinasxprofessores set curso=?, cargahoraria=?,anoletivo=?,coddisciplinas=?,codprofessores=? where idDiscProf=?"
            this._banco.query(sql,parametros,function(erro,resultado){
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
        return operacao
    }

    async read(){
        const operacao = new Promise((resolve, reject) => {
            const parametros = []
            
            const sql = "select * from disciplinasxprofessores"
            this._banco.query(sql,parametros,function(erro,resultado){
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
        return operacao
    }

    async readById(){
        const operacao = new Promise((resolve, reject) => {
            const idDiscProf=this._idDiscProf
            const parametros = [idDiscProf]
            
            const sql = "select * from disciplinasxprofessores where idDiscProf=?"
            this._banco.query(sql,parametros,function(erro,resultado){
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
        return operacao
    }

    async delete(){
        const operacao = new Promise((resolve, reject) => {
            const idDiscProf=this._idDiscProf
            const parametros = [idDiscProf]
            
            const sql = "delete from disciplinasxprofessores where idDiscProf=?"
            this._banco.query(sql,parametros,function(erro,resultado){
                if(erro){
                    reject(erro)
                }else{
                    resolve(resultado)
                }
            })
        })
        return operacao
    }

    set banco(valor) {
        this._banco = valor;
    }
    get banco() {
        return this._banco;
    }

    set idDiscProf(idDiscProf) {
        this._idDiscProf = idDiscProf;
    }
    get idDiscProf() {
        return this._idDiscProf;
    }

    set curso(valor) {
        this._curso = valor;
    }
    get curso() {
        return this._curso;
    }

    set cargahoraria(valor) {
        this._cargahoraria = valor;
    }
    get cargahoraria() {
        return this._cargahoraria;
    }

    set anoletivo(valor) {
        this._anoletivo = valor;
    }
    get anoletivo() {
        return this._anoletivo;
    }

    set disciplinasf(valor) {
        this._disciplinasf = valor;
    }
    get disciplinasf() {
        return this._disciplinasf;
    }

    set professoresf(valor) {
        this._professoresf = valor;
    }
    get professoresf() {
        return this._professoresf;
    }

}