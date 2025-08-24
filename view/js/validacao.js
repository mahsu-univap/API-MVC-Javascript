function validar(){
    const payload = localStorage.getItem("payload")
    const token = localStorage.getItem("token")
    const objUsuario = JSON.parse(payload)

    if(token==null||payload==null){
        window.location = "login.html"

    }else{
        return objUsuario.email
    }
}

